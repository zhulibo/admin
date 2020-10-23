let permissionList = [
  {
    path: '/adminModule',
    name: '管理员',
    children: [
      {
        path: '/admin',
        name: '管理员',
        children: [
          {
            path: '/adminList',
            name: '管理员列表'
          },
          {
            path: '/adminEdit',
            name: '管理员编辑'
          },
        ]
      },
      {
        path: '/role',
        name: '角色',
        children: [
          {
            path: '/roleList',
            name: '角色列表',
          },
          {
            path: '/roleEdit',
            name: '角色编辑',
          },
          {
            path: '/roleDel',
            name: '角色删除',
          },
        ]
      },
    ]
  },
  {
    path: '/articleModule',
    name: '模玩文化',
    children: [
      {
        path: '/article',
        name: '模玩文化',
        children: [
          {
            path: '/articleList',
            name: '模玩文化列表',
          },
          {
            path: '/articleEdit',
            name: '模玩文化编辑',
          }
        ]
      },
    ]
  },
  {
    path: '/bannerModule',
    name: '轮播图',
    children: [
      {
        path: '/banner',
        name: '轮播图',
        children: [
          {
            path: '/bannerList',
            name: '轮播图列表',
          },
          {
            path: '/bannerEdit',
            name: '轮播图编辑',
          },
        ]
      },
    ]
  },
  {
    path: '/cashOutModule',
    name: '提现',
    children: [
      {
        path: '/cashOut',
        name: '提现',
        children: [
          {
            path: '/cashOutList',
            name: '提现列表',
          },
        ]
      }
    ]
  },
  {
    path: '/classifyModule',
    name: '分类',
    children: [
      {
        path: '/classifyPreview2',
        name: '分类预览',
        children: [
          {
            path: '/classifyPreview',
            name: '分类预览',
          }
        ]
      },
      {
        path: '/classifyLevelOne',
        name: '一级分类',
        children: [
          {
            path: '/classifyLevelOneList',
            name: '一级分类列表',
          },
          {
            path: '/classifyLevelOneEdit',
            name: '一级分类编辑',
          },
          {
            path: '/classifyLevelOneDel',
            name: '一级分类删除',
          },
        ]
      },
      {
        path: '/classifyModule',
        name: '模块',
        children: [
          {
            path: '/classifyModuleList',
            name: '模块列表',
          },
          {
            path: '/classifyModuleEdit',
            name: '模块编辑',
          },
          {
            path: '/classifyModuleDel',
            name: '模块删除',
          },
        ]
      },
      {
        path: '/classifyLevelTwo',
        name: '二级分类',
        children: [
          {
            path: '/classifyLevelTwoList',
            name: '二级分类列表',
          },
          {
            path: '/classifyLevelTwoEdit',
            name: '二级分类编辑',
          },
          {
            path: '/classifyLevelTwoDel',
            name: '二级分类删除',
          },
        ]
      },
      {
        path: '/classifyLevelThree',
        name: '三级分类',
        children: [
          {
            path: '/classifyLevelThreeList',
            name: '三级分类列表',
          },
          {
            path: '/classifyLevelThreeEdit',
            name: '三级分类编辑',
          },
          {
            path: '/classifyLevelThreeDel',
            name: '三级分类删除',
          },
        ]
      },
      {
        path: '/classifyType',
        name: '类别',
        children: [
          {
            path: '/classifyTypeList',
            name: '类别列表',
          },
          {
            path: '/classifyTypeEdit',
            name: '类别编辑',
          },
          {
            path: '/classifyTypeDel',
            name: '类别删除',
          },
        ]
      },
      {
        path: '/classifyBrand',
        name: '品牌',
        children: [
          {
            path: '/classifyBrandList',
            name: '品牌列表',
          },
          {
            path: '/classifyBrandEdit',
            name: '品牌编辑',
          },
          {
            path: '/classifyBrandDel',
            name: '品牌删除',
          },
        ]
      },
      {
        path: '/classifyIp',
        name: 'IP',
        children: [
          {
            path: '/classifyIpList',
            name: 'IP列表',
          },
          {
            path: '/classifyIpEdit',
            name: 'IP编辑',
          },
          {
            path: '/classifyIpDel',
            name: 'IP删除',
          },
        ]
      },
      {
        path: '/classifyAttribute',
        name: '属性',
        children: [
          {
            path: '/classifyAttributeList',
            name: '属性列表',
          },
          {
            path: '/classifyAttributeEdit',
            name: '属性编辑',
          },
          {
            path: '/classifyAttributeDel',
            name: '属性删除',
          },
        ]
      },
      {
        path: '/classifyIndex',
        name: '首页分类',
        children: [
          {
            path: '/classifyIndexList',
            name: '首页分类列表',
          },
          {
            path: '/classifyIndexEdit',
            name: '首页分类编辑',
          },
          {
            path: '/classifyIndexDel',
            name: '首页分类删除',
          },
        ]
      },
    ]
  },
  {
    path: '/couponModule',
    name: '优惠券',
    children: [
      {
        path: '/giftPack',
        name: '礼包',
        children: [
          {
            path: '/giftPackList',
            name: '礼包列表',
          },
          {
            path: '/giftPackEdit',
            name: '礼包编辑',
          },
          {
            path: '/giftPackDel',
            name: '礼包删除',
          },
          {
            path: '/couponList',
            name: '优惠券列表',
          },
          {
            path: '/couponEdit',
            name: '优惠券编辑',
          },
          {
            path: '/couponDel',
            name: '优惠券删除',
          },
        ]
      },
    ]
  },
  {
    path: '/goodsModule',
    name: '商品',
    children: [
      {
        path: '/goods',
        name: '现货商品',
        children: [
          {
            path: '/goodsList',
            name: '现货商品列表',
          },
          {
            path: '/goodsNew',
            name: '现货商品发布',
          },
          {
            path: '/goodsEdit',
            name: '现货商品编辑',
          },
          {
            path: '/goodsDel',
            name: '现货商品删除',
          },
          {
            path: '/goodsSkuEdit',
            name: '现货商品sku编辑',
          },
        ]
      },
      {
        path: '/goodsPresale',
        name: '预售商品',
        children: [
          {
            path: '/goodsPresaleList',
            name: '预售商品列表',
          },
          {
            path: '/goodsPresaleNew',
            name: '预售商品发布',
          },
          {
            path: '/goodsPresaleEdit',
            name: '预售商品编辑',
          },
          {
            path: '/goodsPresaleDel',
            name: '预售商品删除',
          },
          {
            path: '/goodsPresaleSkuEdit',
            name: '预售商品sku编辑',
          },
          {
            path: '/goodsPresaleActivityEdit',
            name: '预售设置',
          },
        ]
      },
      {
        path: '/goodsPresaleActivity',
        name: '预售活动',
        children: [
          {
            path: '/goodsPresaleActivityList',
            name: '预售活动列表',
          },
          {
            path: '/goodsPresaleActivityStartPay',
            name: '开始付尾款',
          },
          {
            path: '/goodsPresaleActivityEndPay',
            name: '结束预售',
          },
        ]
      },
      {
        path: '/goodsLottery',
        name: '抽奖商品',
        children: [
          {
            path: '/goodsLotteryList',
            name: '抽奖商品列表',
          },
          {
            path: '/goodsLotteryEdit',
            name: '抽奖商品编辑',
          },
          {
            path: '/goodsLotteryCodeList',
            name: '抽奖码列表',
          },
        ]
      },
      {
        path: '/goodsImgBorder',
        name: '图片边框',
        children: [
          {
            path: '/goodsImgBorderList',
            name: '图片边框设置列表',
          },
          {
            path: '/goodsImgBorderEdit',
            name: '商品图片边框编辑',
          },
          {
            path: '/goodsImgBorderBlindNew',
            name: '图片边框绑定新商品',
          },
          {
            path: '/goodsImgBorderBlindList',
            name: '图片边框已绑商品列表',
          },
        ]
      },
      {
        path: '/goodsRecommend',
        name: '推荐商品',
        children: [
          {
            path: '/goodsRecommendList',
            name: '推荐商品列表',
          },
          {
            path: '/goodsRecommendEdit',
            name: '推荐商品编辑',
          },
          {
            path: '/goodsRecommendDel',
            name: '推荐商品删除',
          },
        ]
      },
    ]
  },
  {
    path: '/hotWordModule',
    name: '热词',
    children: [
      {
        path: '/hotWord',
        name: '热词',
        children: [
          {
            path: '/hotWordList',
            name: '热词列表',
          },
          {
            path: '/hotWordEdit',
            name: '热词编辑',
          },
          {
            path: '/hotWordDel',
            name: '热词删除',
          },
        ]
      },
    ]
  },
  {
    path: '/orderModule',
    name: '订单',
    children: [
      {
        path: '/order',
        name: '现货订单',
        children: [
          {
            path: '/orderList',
            name: '现货订单列表',
          },
          {
            path: '/orderDetail',
            name: '现货订单详情',
          },
          {
            path: '/orderConfirmReceipt',
            name: '现货订单确认收货',
          },
          {
            path: '/orderCancleOrder',
            name: '现货订单取消',
          },
        ]
      },
      {
        path: '/orderPresale',
        name: '预售订单',
        children: [
          {
            path: '/orderPresaleList',
            name: '预售订单列表',
          },
          {
            path: '/orderPresaleDetail',
            name: '预售订单详情',
          },
          {
            path: '/orderPresaleCancleOrder',
            name: '预售订单取消',
          },
        ]
      },
      {
        path: '/orderSupplier',
        name: '供货商现货订单',
        children: [
          {
            path: '/orderSupplierList',
            name: '供货商现货订单列表',
          },
          {
            path: '/orderSupplierDetail',
            name: '供货商现货订单详情',
          },
          {
            path: '/orderSupplierPresaleShip',
            name: '供货商预售订单发货',
          },
        ]
      },
      {
        path: '/orderSupplierPresale',
        name: '供货商预售订单',
        children: [
          {
            path: '/orderSupplierPresaleList',
            name: '供货商预售订单列表',
          },
          {
            path: '/orderSupplierPresaleDetail',
            name: '供货商预售订单详情',
          },
        ]
      },
      {
        path: '/orderRepair',
        name: '修复订单',
        children: [
          {
            path: '/orderRepairList',
            name: '修复订单列表',
          },
          {
            path: '/orderRepairDetail',
            name: '修复订单详情',
          },
          {
            path: '/orderRepairFirstEvaluation',
            name: '修复订单初次评审',
          },
          {
            path: '/orderRepairSecondEvaluation',
            name: '修复订单二次评估',
          },
          {
            path: '/orderRepairReceived',
            name: '修复订单平台已收货',
          },
          {
            path: '/orderRepairRepairOver',
            name: '修复订单修复完成',
          },
          {
            path: '/orderRepairShip',
            name: '修复订单发货',
          },
        ]
      },
    ]
  },
  {
    path: '/socialModule',
    name: '社交动态',
    children: [
      {
        path: '/social',
        name: '社交动态',
        children: [
          {
            path: '/socialList',
            name: '社交动态列表',
          },
          {
            path: '/socialEdit',
            name: '社交动态编辑',
          },
          {
            path: '/socialCommentList',
            name: '社交动态评论列表',
          },
          {
            path: '/socialCommentEdit',
            name: '社交动态评论编辑',
          },
        ]
      },
    ]
  },
  {
    path: '/statisticsModule',
    name: '数据统计',
    children: [
      {
        path: '/statistics',
        name: '数据统计',
        children: [
          {
            path: '/dayActiveNumber',
            name: '日活',
          },
          {
            path: '/registerNumber',
            name: '注册数',
          },
        ]
      }
    ]
  },
  {
    path: '/supplierModule',
    name: '供货商',
    children: [
      {
        path: '/supplierStore2',
        name: '仓库',
        children: [
          {
            path: '/supplierStore',
            name: '仓库',
          },
          {
            path: '/supplierGoodsStockAdd',
            name: '添加库存',
          },
        ]
      },
      {
        path: '/supplierGoods',
        name: '出售商品',
        children: [
          {
            path: '/supplierGoodsList',
            name: '出售商品列表',
          },
          {
            path: '/supplierGoodsStockEdit',
            name: '编辑库存',
          },
        ]
      },
      {
        path: '/supplierAddress',
        name: '发货地址',
        children: [
          {
            path: '/supplierAddressList',
            name: '发货地址列表',
          },
          {
            path: '/supplierAddressEdit',
            name: '发货地址编辑',
          },
          {
            path: '/supplierAddressDel',
            name: '发货地址删除',
          },
        ]
      },
      {
        path: '/supplierCarriage',
        name: '运费',
        children: [
          {
            path: '/supplierCarriageEdit',
            name: '运费编辑',
          }
        ]
      },
    ]
  },
  {
    path: '/tribeModule',
    name: '部落',
    children: [
      {
        path: '/tribe',
        name: '部落',
        children: [
          {
            path: '/tribeList',
            name: '部落列表',
          },
          {
            path: '/tribeEdit',
            name: '部落编辑',
          },
          {
            path: '/tribeMemberList',
            name: '部落成员列表',
          },
          {
            path: '/tribeMemberManage',
            name: '部落成员管理',
          },
        ]
      },
    ]
  },
  {
    path: '/userModule',
    name: '用户',
    children: [
      {
        path: '/user',
        name: '用户',
        children: [
          {
            path: '/userList',
            name: '用户列表',
          },
          {
            path: '/userEdit',
            name: '用户编辑',
          },
        ]
      },
      {
        path: '/businessMan',
        name: '商家',
        children: [
          {
            path: '/businessManList',
            name: '商家列表',
          },
          {
            path: '/businessManEdit',
            name: '商家编辑',
          },
        ]
      },
    ]
  },
]

export default permissionList