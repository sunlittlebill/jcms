Ext.define('Admin.view.content.headline.text.TextMainForm', {
    extend: 'Admin.view.common.window.BaseFormWindow',
    xtype: 'content-headline-text-mform',

    requires: [
        'Admin.view.content.headline.text.TextController',
        'Admin.view.content.headline.text.TextHeadlineMainGrid'
    ],


    controller: 'content-headline-text',

    maximized: true,// 默认最大化窗口
    maximizable: false, // 不支持放大 or 缩小
    width: 1000,
    // height: 800,
    layout: 'border',

    initComponent: function () {
        var me = this,
            viewModel = me.getViewModel();
        var aId = viewModel.get("aId");

        Ext.apply(me, {
            items: [{
                xtype: 'panel',
                region: 'center',
                layout: 'form',
                // minHeight: 400,
                border: false,
                scrollable: 'y',
                items: [
                    {
                        border: false,

                        xtype: 'form',
                        // height: '100%',
                        defaults: {
                            xtype: 'fieldcontainer',
                            defaults: {
                                labelWidth: 80,
                                labelAlign: 'right',
                                width: '50%'
                            }
                        },
                        bodyPadding: 10,
                        items: [
                            {

                                layout: {
                                    type: 'hbox',
                                    align: 'stretchmax'
                                },
                                items: [
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: '文章标题',
                                        reference: 'title',
                                        publishes: 'value',
                                        name: 'title'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: '文章ID',
                                        name: 'id',
                                        width: '30%'
                                    }
                                ]
                            },
                            {
                                layout: {
                                    type: 'hbox',
                                    align: 'stretchmax'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: '头条标题',
                                        name: 'topTitle',
                                        allowBlank: false,
                                        bind: {
                                            value: '{title.value}'
                                        }
                                    },
                                    {
                                        xtype: 'checkboxgroup',
                                        fieldLabel: '套红',
                                        items: [
                                            {
                                                //boxLabel: '套红',
                                                name: 'redStatus',
                                                inputValue: '1'/*,
                                             boxLabelAlign: 'before'*/
                                            }
                                        ],
                                        width: 100
                                    }
                                ]
                            },
                            {
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: '栏目名称',
                                        name: 'category',
                                        allowBlank: false,
                                        width: '50%'
                                    }
                                ]
                            },

                            {
                                layout: 'fit',
                                width: 595,
                                style: {
                                    left: '85px'
                                },
                                items: [
                                    {
                                        xtype: 'itemselector',
                                        name: 'categoryName',
                                        height: 220,
                                        scrollable: 'y',
                                        allowBlank: false,
                                        imagePath: '../ux/images/',
                                        buttons: [
                                            'add', 'remove'
                                        ],
                                        buttonsText: [
                                            '增加', '删除'
                                        ],
                                        store: {
                                            proxy: {
                                                type: 'ajax',
                                                url: '/cn/article/categoryENameList',
                                                reader: {
                                                    type: 'json',
                                                    rootProperty: 'rows'
                                                }
                                            },
                                            autoLoad: true
                                        },
                                        displayField: 'name',
                                        valueField: 'id',
                                        msgTarget: 'side'
                                    }
                                ]
                            }

                        ],
                        tbar: [
                            '->',
                            {
                                text: '重置',
                                iconCls: 'x-fa fa-undo',
                                action: 'reset',
                                handler: 'onResetBtnClicked'
                            },
                            {
                                text: '提交',
                                iconCls: 'x-fa fa-floppy-o',
                                tooltip: '快捷键：Ctrl+Enter',
                                disabled: true,
                                formBind: true,  // 表单验证通过后才能点击
                                action: 'submit',
                                handler: 'onSubmitBtnClicked'
                            }
                        ]
                    }
                ]
            },
                {
                    region: 'south',
                    height: '35%',
                    xtype: 'content-headline-text-mgrid-2',
                    viewModel: {
                        data: {
                            aId: aId
                        }
                    }
                    // items: new Admin.view.content.headline.text.TextHeadlineMainGrid()
                }
            ]
        });

        me.callParent();
    }

});