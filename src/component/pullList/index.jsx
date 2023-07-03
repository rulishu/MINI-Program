import { ScrollView, Text, View } from '@tarojs/components';
import React, { Fragment, useImperativeHandle } from 'react';
import { useSetState, useRequest, useDeepCompareEffect } from 'ahooks';
import { Empty } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';

const InfiniteUlStyle = {
  height: '100vh',
};

const endStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#7F7F7F',
  fontSize: 14,
};

export default React.forwardRef(
  (
    {
      request,
      params,
      style,
      renderList,
      callback,
      emptyStyle,
      defaultPageSize = 10,
      scrollViewProps,
      renderEmpty,
      bottomHeight = 0,
    },
    ref,
  ) => {
    const [state, setState] = useSetState({
      pageNum: 1,
      pageSize: defaultPageSize,
      dataSource: [],
      total: 0,
      refreshHasMore: false,
      refreshLoading: false,
    });
    const { pageNum, pageSize, dataSource, total, refreshHasMore, refreshLoading } = state;

    const { run } = useRequest(request, {
      manual: true,
      onSuccess: ({ code, result }) => {
        if (code && code === 200) {
          setState({
            total: result.total, // you had 'result.result' here, changed to 'result.total' assuming 'total' is the correct property name
            dataSource:
              pageNum === 1 ? result.records || [] : [...dataSource, ...(result.records || [])],
            refreshHasMore:
              pageNum === 1 ? false : [...dataSource, ...result.records].length === total,
          });
          Taro.hideLoading();
          setState({ refreshLoading: false });
        } else {
          Taro.hideLoading();
          setState({ refreshLoading: false });
        }
      },
    });

    useDeepCompareEffect(() => {
      callback?.({
        refresh: refresh,
      });
    }, [params]);

    // 上拉加载更多
    const loadMore = () => {
      if (!refreshLoading && dataSource.length < total) {
        Taro.showLoading({ title: '加载中...', mask: true });
        run({
          pageNum: pageNum + 1,
          pageSize: pageSize,
          ...params,
        });
        setState({ pageNum: pageNum + 1 });
      }
    };

    // 下拉刷新
    const refresh = () => {
      if (!refreshLoading) {
        Taro.showLoading({ title: '加载中...', mask: true });
        setState({ refreshLoading: true, pageNum: 1 });
        run({
          pageNum: 1,
          pageSize: pageSize,
          ...params,
        });
      }
    };
    useImperativeHandle(ref, () => {
      return {
        refresh: refresh,
      };
    });
    return (
      <ScrollView
        style={{ ...InfiniteUlStyle, ...style }}
        scrollY
        scrollWithAnimation
        refresherEnabled
        lowerThreshold={30}
        refresherTriggered={refreshLoading}
        onScrollToLower={loadMore}
        onRefresherRefresh={refresh}
        {...scrollViewProps}
      >
        <Fragment>
          {dataSource.length === 0 ? (
            <Empty style={{ background: 'F5F5F5', ...emptyStyle }} description="暂无数据" />
          ) : (
            renderList?.(dataSource, refresh)
          )}
          {/* 处理总数小于或者等于每页条数情况 */}
          {total === 0
            ? ''
            : (Math.floor(total / pageSize) < 1 || total === pageSize || refreshHasMore) &&
              (renderEmpty?.() || <Text style={endStyle}>——已到底部——</Text>)}
        </Fragment>
        <View style={{ height: bottomHeight }} />
      </ScrollView>
    );
  },
);
