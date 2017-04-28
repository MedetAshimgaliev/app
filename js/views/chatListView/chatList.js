var ChatListView = Backbone.View.extend({
	el: '#chat',
	template: _.template($('#chat-view').html()),
	vent: null,
	initialize : function () {
		var self = this;
		this.vent = vent;

		this.listenTo(this.model, 'all', this.render);

		this.vent.on('send', function (item){
			self.addMessage(item);
			// console.log(item.nickname);
			document.getElementById('title_ine').innerHTML = item.nickname;
		});

		this.vent.on('deleteLastMessage', function (id) {
			self.deleteLastMessage(id);
		});
	},
	render : function () {
		if(!this.template) {
			return false;
		}
		var data = null, html;

		if(this.model) {
			data = this.model.toJSON();
		}

		html = this.template({model: data});

		this.$el.html(html);
		return this;
	},
	deleteLastMessage : function (id) {
		var collection = this.model.toJSON();

	var indexOfModel = _.findLastIndex(collection, {
			userId: id
		});

		if(indexOfModel == -1) {
			alert("You don't have any message");
			return false;
		}

		this.model.at(indexOfModel).destroy();
	},
	addMessage : function (item) {
		this.model.add(item);
	}
});
