Ext.define('Admin.view.content.index.embed.Futian', {
    extend: 'Ext.panel.Panel',
    xtype: 'content-index-embed-futian',

    requires: [
        'Admin.view.content.index.embed.FutianController',
        'Admin.view.content.index.embed.FutianGrid',
        'Admin.view.content.index.embed.FutianForm'
    ],

    controller: 'content-index-embed-futian',
    layout: 'border',
    margin: 5,

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            items: [
                {
                    region:'north',
                    xtype: 'content-index-embed-futian-mform'
                },
                {
                    region:'center',
                    xtype: 'content-index-embed-futian-mgrid'
                }
            ],
            tbar: [
                {
                    xtype: 'button',
                    text: '保存',
                    iconCls: 'x-fa fa-pencil-square-o',
                    action: 'edit'
                },
                {
                    xtype: 'button',
                    text: '发布',
                    iconCls: 'x-fa fa-paper-plane-o',
                    action: 'release'
                },
                '-',
                {
                    xtype: 'button',
                    text: '刷新',
                    iconCls: 'x-fa fa-refresh',
                    action: 'refresh'
                }
            ]
        });

        me.callParent();
    }
});