import { ScrollView, Text } from '@tarojs/components';
import React, { Fragment, useEffect, useImperativeHandle } from 'react';
import { useSetState, useRequest } from 'ahooks';
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
  ({ request, params, style, tab4value, renderList, paramsCode = '' }, ref) => {
    const [state, setState] = useSetState({
      pageNum: 1,
      pageSize: 10,
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

    useEffect(() => {
      if (paramsCode && tab4value === params[paramsCode]) {
        refresh();
      } else {
        refresh();
      }
    }, [tab4value, paramsCode]);

    // 上拉加载更多
    const loadMore = () => {
      if (dataSource.length < total) {
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
      Taro.showLoading({ title: '加载中...', mask: true });
      setState({ refreshLoading: true, pageNum: 1 });
      run({
        pageNum: 1,
        pageSize: pageSize,
        ...params,
      });
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
      >
        <Fragment>
          {dataSource.length === 0 ? (
            <Empty style={{ background: 'F5F5F5' }} description="暂无数据" />
          ) : (
            renderList?.(dataSource)
          )}
          {refreshHasMore && <Text style={endStyle}>——已到底部——</Text>}
        </Fragment>
      </ScrollView>
    );
  },
);
