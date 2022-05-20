pimcore.registerNS("pimcore.layout.portlets.PolargoldIFramePortletBundle");
pimcore.layout.portlets.PolargoldIFramePortletBundle = Class.create(pimcore.layout.portlets.abstract, {

  getType: function () {
    return "pimcore.layout.portlets.PolargoldIFramePortletBundle";
  },

  getName: function () {
    return t('PolargoldIFramePortletBundle_portlet_name');
  },

  getIcon: function () {
    return "pimcore_icon_iframe";
  },

  setConfig: function (config) {
    let parsed = {
      titleField: null,
      urlField: null,
      heightField: null,
    };

    try {
      if (config) {
        parsed = JSON.parse(config);
      }
    } catch (e) {
      console.error('Failed to parse iframe portlet config: ', e);
    }

    this.config = parsed;
  },

  getLayout: function (portletId) {
    let defaultConf = this.getDefaultConfig();
    defaultConf.tools = [
      {
        type: 'gear',
        handler: this.editSettings.bind(this)
      },
      {
        type: 'close',
        handler: this.remove.bind(this)
      }
    ];

    this.layout = Ext.create('Portal.view.Portlet', Object.assign(defaultConf, {
      title: this.config?.title || this.getName(),
      iconCls: this.getIcon(),
      layout: "fit",
      height: parseInt(this.config?.height || 275, 10),
    }));

    if (this.config?.sourceUrl) {
      this.layout.add({
        xtype: 'box',
        autoEl: {
          tag: 'iframe',
          src: this.config.sourceUrl,
          frameborder: 0
        }
      });
    }

    this.layout.portletId = portletId;
    return this.layout;
  },

  editSettings: function () {
    let titleField = new Ext.form.TextField({
      name: "title",
      fieldLabel: t('PolargoldIFramePortletBundle_settings_title_field'),
      width: 500,
      value: this.config?.title || this.getName()
    });

    let urlField = new Ext.form.TextField({
      name: "sourceUrl",
      fieldLabel: t('PolargoldIFramePortletBundle_settings_url_field'),
      width: 500,
      value: this.config?.sourceUrl || ''
    });

    let heightField = new Ext.form.NumberField({
      name: "height",
      fieldLabel: t('PolargoldIFramePortletBundle_settings_height_field'),
      width: 500,
      value: this.config?.height || 275
    });

    let win = new Ext.Window({
      width: 550,
      height: 280,
      modal: true,
      title: t('PolargoldIFramePortletBundle_settings_title'),
      closeAction: "destroy",
      items: [
        {
          xtype: "form",
          bodyStyle: "padding: 10px",
          items: [
            titleField,
            urlField,
            heightField,
            {
              xtype: "button",
              text: t('PolargoldIFramePortletBundle_settings_save'),
              handler: function (button) {
                let form = button.up('form').getForm();
                this.updateSettings(form.getValues());

                win.close();
              }.bind(this)
            }
          ]
        }
      ]
    });

    win.show();
  },

  updateSettings: function (data) {
    this.config = data;

    Ext.Ajax.request({
      url: Routing.generate('pimcore_admin_portal_updateportletconfig'),
      method: 'PUT',
      params: {
        key: this.portal.key,
        id: this.layout.portletId,
        config: JSON.stringify(this.config)
      },

      success: function () {
        this.renderIFrame(this.config);
      }.bind(this),

      failure: function() {
        // ignore
      }.bind(this)
    });
  },

  renderIFrame: function (config) {
    if (!config || !config.sourceUrl) {
      this.layout.removeAll();
      this.layout.add(new Ext.Component({
        html: t('PolargoldIFramePortletBundle_settings_error_url'),
        padding: 20
      }));
      return;
    }

    let iframe = new Ext.Component({
      autoEl: {
        tag: 'iframe',
        src: config.sourceUrl,
        frameborder: 0
      }
    });

    this.layout.removeAll();
    this.layout.add(iframe);
  }

});
