import { ScrollView, Text } from '@tarojs/components';
import React, { Fragment, useEffect, useImperativeHandle } from 'react';
import { useSetState, useRequest } from 'ahooks';
import { Empty } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';

const InfiniteUlStyle = {
  height: '100vh',
};

export default React.forwardRef(({ request, params, style, tab4value, renderList }, ref) => {
  const [state, setState] = useSetState({
    pageNum: 1,
    pageSize: 20,
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
          refreshHasMore: pageNum === 1 ? false : [...dataSource, ...data].length === total,
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
    if (tab4value === params.id) {
      refresh();
    }
  }, [tab4value]);

  // 上拉加载更多
  const loadMore = () => {
    if (dataSource.length < total) {
      setState({ pageNum: pageNum + 1 });
      Taro.showLoading({ title: '加载中...', mask: true });
      run({
        pageNum: pageNum,
        pageSize: pageSize,
        ...params,
      });
    }
  };

  // 下拉刷新
  const refresh = () => {
    setState({ pageNum: 1 });
    Taro.showLoading({ title: '加载中...', mask: true });
    setState({ refreshLoading: true });
    run({
      pageNum: pageNum,
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
      lowerThreshold={10}
      refresherTriggered={refreshLoading}
      onScrollToLower={loadMore}
      onRefresherRefresh={refresh}
    >
      {dataSource.length === 0 ? (
        <Empty style={{ background: 'F5F5F5' }} description="暂无数据" />
      ) : (
        <Fragment>
          {renderList?.(dataSource)}
          {refreshHasMore && <Text>无更多数据</Text>}
        </Fragment>
      )}
    </ScrollView>
  );
});
