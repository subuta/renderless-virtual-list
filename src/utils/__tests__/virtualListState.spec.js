import sinon from 'sinon'
import _ from 'lodash'

import VirtualListState from 'src/utils/virtualListState'

beforeEach(() => {
})

afterEach(() => {
})

test('should have initial props', () => {
  const virtualListState = new VirtualListState()
  expect(virtualListState.heights).toEqual([])
})

test('should return totalHeight', () => {
  const virtualListState = new VirtualListState(_.times(10, () => 100))
  expect(virtualListState.getTotalHeight()).toEqual(1000)
})

test('should return visibleIndex', () => {
  const virtualListState = new VirtualListState(_.times(10, () => 100))

  expect(virtualListState.findVisibleIndex(0, 300)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 2,
    toPosition: 300
  })

  expect(virtualListState.findVisibleIndex(100, 300)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 2,
    toPosition: 300
  })

  expect(virtualListState.findVisibleIndex(101, 300)).toEqual({
    from: 1,
    fromPosition: 100,
    to: 2,
    toPosition: 300
  })

  expect(virtualListState.findVisibleIndex(100, 301)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 3,
    toPosition: 400
  })
})

test('should return overScanIndex', () => {
  const virtualListState = new VirtualListState(_.times(10, () => 100))

  expect(virtualListState.findOverScanIndex(0, 300, 3)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 5,
    toPosition: 600
  })

  expect(virtualListState.findOverScanIndex(300, 600, 3)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 8,
    toPosition: 900
  })

  expect(virtualListState.findOverScanIndex(300, 601, 3)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 9,
    toPosition: 1000
  })

  expect(virtualListState.findOverScanIndex(400, 700, 3)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 9,
    toPosition: 1000
  })

  expect(virtualListState.findOverScanIndex(401, 700, 3)).toEqual({
    from: 1,
    fromPosition: 100,
    to: 9,
    toPosition: 1000
  })

  expect(virtualListState.findOverScanIndex(700, 1000, 3)).toEqual({
    from: 3,
    fromPosition: 300,
    to: 9,
    toPosition: 1000
  })
})

test('should overScanIndex return visibleIndex if No-overScan count specified.', () => {
  const virtualListState = new VirtualListState(_.times(10, () => 100))

  expect(virtualListState.findOverScanIndex(0, 300)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 2,
    toPosition: 300
  })

  expect(virtualListState.findOverScanIndex(100, 300)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 2,
    toPosition: 300
  })

  expect(virtualListState.findOverScanIndex(101, 300)).toEqual({
    from: 1,
    fromPosition: 100,
    to: 2,
    toPosition: 300
  })

  expect(virtualListState.findOverScanIndex(100, 301)).toEqual({
    from: 0,
    fromPosition: 0,
    to: 3,
    toPosition: 400
  })
})

test('should return groupHeights', () => {
  const heights = [
    100, 100, 100, 50,
    100, 100, 100, 50,
    100, 100, 100, 100, 50
  ]

  const virtualListState = new VirtualListState(heights, [4, 8, 13])

  expect(virtualListState.getGroupHeight(4)).toEqual({ height: 350, from: 0 })
  expect(virtualListState.getGroupHeight(8)).toEqual({ height: 350, from: 350 })
  expect(virtualListState.getGroupHeight(13)).toEqual({ height: 450, from: 700 })
})
