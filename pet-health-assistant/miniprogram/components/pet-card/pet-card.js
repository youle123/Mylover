// components/pet-card/pet-card.js
Component({
  properties: {
    pet: {
      type: Object,
      value: {}
    },
    compact: {
      type: Boolean,
      value: false
    },
    showActions: {
      type: Boolean,
      value: false
    }
  },

  data: {

  },

  methods: {
    onTap() {
      this.triggerEvent('tap', {
        pet: this.properties.pet
      });
    },

    onEdit(e) {
      e.stopPropagation();
      this.triggerEvent('edit', {
        pet: this.properties.pet
      });
    },

    onDelete(e) {
      e.stopPropagation();
      wx.showModal({
        title: '确认删除',
        content: `确定要删除宠物"${this.properties.pet.name}"吗？`,
        confirmText: '删除',
        confirmColor: '#FF3B30',
        success: (res) => {
          if (res.confirm) {
            this.triggerEvent('delete', {
              pet: this.properties.pet
            });
          }
        }
      });
    }
  }
});
