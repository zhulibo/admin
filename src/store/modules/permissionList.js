let permissionList = [
  {
    path: '/admin',
    name: '管理员',
    children: [
      {
        path: '/admin',
        name: '管理员',
        children: [
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
    path: '/article',
    name: '模玩文化',
    children: [
      {
        path: '/article',
        name: '模玩文化',
        children: [
          {
            path: '/articleEdit',
            name: '模玩文化编辑',
          }
        ]
      },
    ]
  },
  {
    path: '/banner',
    name: '轮播图',
    children: [
      {
        path: '/banner',
        name: '轮播图',
        children: [
          {
            path: '/bannerEdit',
            name: '轮播图编辑',
          },
        ]
      },
    ]
  },
  {
    path: '/classify',
    name: '分类',
    children: [
      {
        path: '/classifyPreview',
        name: '分类预览',
      },
      {
        path: '/classifyLevelOne',
        name: '一级分类',
        children: [
          {
            path: '/classifyLevelOneEdit',
            name: '一级分类编辑',
          }
        ]
      },
      {
        path: '/classifyModule',
        name: '模块',
        children: [
          {
            path: '/classifyModuleEdit',
            name: '模块编辑',
          }
        ]
      },
      {
        path: '/classifyLevelTwo',
        name: '二级分类',
        children: [
          {
            path: '/classifyLevelTwoEdit',
            name: '二级分类编辑',
          }
        ]
      },
      {
        path: '/classifyLevelThree',
        name: '三级分类',
        children: [
          {
            path: '/classifyLevelThreeEdit',
            name: '三级分类编辑',
          }
        ]
      },
      {
        path: '/classifyType',
        name: '类别',
        children: [
          {
            path: '/classifyTypeEdit',
            name: '类别编辑',
          }
        ]
      },
      {
        path: '/classifyBrand',
        name: '品牌',
        children: [
          {
            path: '/classifyBrandEdit',
            name: '品牌编辑',
          }
        ]
      },
      {
        path: '/classifyIp',
        name: 'IP',
        children: [
          {
            path: '/classifyIpEdit',
            name: 'IP编辑',
          }
        ]
      },
      {
        path: '/classifyAttribute',
        name: '属性',
        children: [
          {
            path: '/classifyAttributeEdit',
            name: '属性编辑',
          }
        ]
      },
      {
        path: '/classifyIndex',
        name: '首页分类',
        children: [
          {
            path: '/classifyIndexEdit',
            name: '首页编辑',
          }
        ]
      },
    ]
  },
  {
    path: '/coupon',
    name: '优惠券',
    children: [
      {
        path: '/giftPack',
        name: '礼包',
        children: [
          {
            path: '/giftPackEdit',
            name: '礼包编辑',
          },
          {
            path: '/coupon',
            name: '优惠券 ',
          },
          {
            path: '/couponEdit',
            name: '优惠券编辑',
          },
        ]
      },
    ]
  },
  {
    path: '/goods',
    name: '商品',
    children: [
      {
        path: '/goods',
        name: '普通商品',
        children: [
          {
            path: '/goodsNew',
            name: '商品发布',
          },
          {
            path: '/goodsEdit',
            name: '商品编辑',
          },
          {
            path: '/goodsSkuEdit',
            name: '商品sku编辑',
          },
        ]
      },
      {
        path: '/goodsPresale',
        name: '预售商品',
        children: [
          {
            path: '/goodsPresaleNew',
            name: '预售商品发布',
          },
          {
            path: '/goodsPresaleEdit',
            name: '预售商品编辑',
          },
          {
            path: '/goodsPresaleSkuEdit',
            name: '预售商品sku编辑',
          },
        ]
      },
      {
        path: '/goodsPresaleActivity',
        name: '预售活动',
        children: [
          {
            path: '/goodsPresaleActivityEdit',
            name: '预售商品活动编辑',
          }
        ]
      },
      {
        path: '/goodsLottery',
        name: '抽奖商品',
        children: [
          {
            path: '/goodsLotteryEdit',
            name: '抽奖商品编辑',
          },
          {
            path: '/goodsLotteryCode',
            name: '抽奖码',
          }
        ]
      },
      {
        path: '/goodsImgBorder',
        name: '图片边框设置',
        children: [
          {
            path: '/goodsImgBorderEdit',
            name: '商品图片边框编辑',
          },
          {
            path: '/goodsImgBorderBlind',
            name: '商品图片边框绑定',
          },
        ]
      },
      {
        path: '/goodsRecommend',
        name: '推荐商品',
        children: [
          {
            path: '/goodsRecommendEdit',
            name: '推荐商品编辑',
          }
        ]
      },
    ]
  },
  {
    path: '/hotWord',
    name: '热词',
    children: [
      {
        path: '/hotWord',
        name: '热词',
        children: [
          {
            path: '/hotWordEdit',
            name: '热词编辑',
          }
        ]
      },
    ]
  },
  {
    path: '/order',
    name: '订单',
    children: [
      {
        path: '/order',
        name: '订单',
        children: [
          {
            path: '/orderDetail',
            name: '订单详情',
          }
        ]
      },
      {
        path: '/orderPresale',
        name: '预售订单',
        children: [
          {
            path: '/orderPresaleDetail',
            name: '预售订单详情',
          }
        ]
      },
      {
        path: '/orderSupplier',
        name: '供货商订单',
        children: [
          {
            path: '/orderSupplierDetail',
            name: '供货商订单详情',
          }
        ]
      },
      {
        path: '/orderSupplierPresale',
        name: '供货商预售订单',
        children: [
          {
            path: '/orderSupplierPresaleDetail',
            name: '供货商预售订单详情',
          }
        ]
      },
      {
        path: '/orderRepair',
        name: '修复订单',
        children: [
          {
            path: '/orderRepairDetail',
            name: '修复订单详情',
          }
        ]
      },
    ]
  },
  {
    path: '/social',
    name: '社交动态',
    children: [
      {
        path: '/social',
        name: '社交动态',
        children: [
          {
            path: '/socialEdit',
            name: '社交动态编辑',
          },
          {
            path: '/socialComment',
            name: '社交动态评论',
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
  },
  {
    path: '/supplier',
    name: '供货商',
    children: [
      {
        path: '/supplierStore',
        name: '仓库',
        children: [
          {
            path: '/supplierGoodsStockAdd',
            name: '添加库存',
          }
        ]
      },
      {
        path: '/supplierGoods',
        name: '出售商品',
        children: [
          {
            path: '/supplierGoodsStockEdit',
            name: '编辑库存',
          }
        ]
      },
      {
        path: '/supplierAddress',
        name: '发货地址',
        children: [
          {
            path: '/supplierAddressEdit',
            name: '发货地址编辑',
          }
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
    path: '/cashOut',
    name: '提现',
    children: [
      {
        path: '/cashOut',
        name: '提现',
      }
    ]
  },
  {
    path: '/tribe',
    name: '部落',
    children: [
      {
        path: '/tribe',
        name: '部落',
        children: [
          {
            path: '/tribeMember',
            name: '部落成员',
          },
          {
            path: '/tribeEdit',
            name: '部落编辑',
          },
        ]
      },
    ]
  },
  {
    path: '/user',
    name: '用户',
    children: [
      {
        path: '/user',
        name: '用户',
        children: [
          {
            path: '/userEdit',
            name: '用户编辑',
          }
        ]
      },
    ]
  },
]

export default permissionList