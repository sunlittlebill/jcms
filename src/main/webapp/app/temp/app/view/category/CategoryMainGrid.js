Ext.define('Admin.view.category.CategoryMainGrid', {
    extend: 'Admin.view.common.panel.BaseGridPanel',
    xtype: 'category-mgrid',

    // Reusable actions
    actions: {
        preview: {
            iconCls: 'x-fa fa-file-excel-o',
            tooltip: '预览',
            handler: 'onDownloadFileBtnClick'
        },
        add: {
            iconCls: 'x-fa fa-file-excel-o',
            tooltip: '新增子栏目',
            handler: 'onDownloadFileBtnClick'
        },
        article: {
            iconCls: 'x-fa fa-building',
            tooltip: '文章列表',
            handler: 'onCreateOrderBtnClicked'
        },
        headline: {
            iconCls: 'x-fa fa-search-plus',
            tooltip: '头条列表',
            handler: 'onSearchOrderBtnClicked'
        },
        picture: {
            iconCls: 'x-fa fa-calendar',
            tooltip: '图片列表',
            handler: 'onAdInfoBtnClicked'
        }

    },


    initComponent: function () {
        var me = this;


        Ext.apply(me, {
            store: Ext.create('Admin.store.API', {
                proxy: {
                    type: 'ajax',
                    url: '/cn/article/categoryList',
                    reader: {
                        type: 'json',
                        rootProperty: 'rows'
                    }
                },
                autoLoad: true
            }),
            columns: [
                // todo edit {dataIndex}

                {text: '栏目ID', dataIndex: 'id', width: 80},
                {
                    text: '栏目名称 <span class="admin-color-red">+</span>',
                    dataIndex: 'name',
                    width: 150,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {text: '栏目路径', dataIndex: 'path', width: 150},
                {
                    text: '存放路径',
                    dataIndex: 'eName',
                    width: 150
                },
                {text: '栏目模板', dataIndex: 'category_template', width: 150},
                {
                    text: '文章模板 <span class="admin-color-red">+</span>',
                    // dataIndex: 'article_template',
                    dataIndex: 'tAId',
                    editor: {
                        xtype: 'combo',
                        store: [
                            [6, '文章模版一'],
                            [7, '文章模版二']
                        ],
                        editable: false, // 不允许编辑
                        triggerAction: 'all',
                        forceSelection: true,
                        allowBlank: false
                    },
                    width: 150,
                    renderer: me.renderer
                },
                {text: '创建时间', dataIndex: 'createDate', xtype: 'datecolumn', format: 'y-m-d H:i:s', width: 150},
                {text: '更新时间', dataIndex: 'updateDate', xtype: 'datecolumn', format: 'y-m-d H:i:s', width: 150},
                // {text: '操作', dataIndex: 'id', renderer: me.renderer, flex: 1 /*width: 230*/}
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: '新增',
                    hidden: true,
                    iconCls: 'x-fa fa-plus-circle',
                    action: 'add'
                },
                {
                    xtype: 'button',
                    text: '保存',
                    iconCls: 'x-fa fa-floppy-o',
                    disabled: true,
                    action: 'save'
                },
                {
                    xtype: 'button',
                    text: '删除',
                    iconCls: 'x-fa fa-trash-o',
                    disabled: true,
                    action: 'delete'
                },

                '-',
                {
                    xtype: 'button',
                    text: '刷新',
                    iconCls: 'x-fa fa-refresh',
                    action: 'refresh'
                }
            ],
            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 2
            }]
        });

        me.callParent();
    },
    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this,

            headerCt = me.getHeaderContainer(),
            column = headerCt.getHeaderAtIndex(colIndex),
            dataIndex = column.dataIndex;

        switch (dataIndex) {
            case 'id':
                var preview = '<button class="admin-label-button" action="preview" title="预览栏目">预览</button>',
                    add = '<button class="admin-label-button" action="add" title="新增子栏目">新增</button>',
                    article = '<button class="admin-label-button" action="article" title="文章列表">文章</button>',
                    headlineText = '<button class="admin-label-button" action="headlineText" title="栏目头条列表">头条</button>',
                    headlinePicture = '<button class="admin-label-button" action="picture" title="栏目图片列表">图片</button>';

                return preview + '' + add + '' + article + '' + headlineText + '' + headlinePicture;
            case 'tAId':
                switch (value) {
                    case 6:
                        return '文章模版一';
                    case 7:
                        return '文章模版二';
                }
            default:
                return value;
        }
    }
});
