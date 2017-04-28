var application = {
	views : {},
	models : {},
	constructors : {
		views : {},
		models : {}
	}
};

application.constructors.chatCollaction = ChatList;
application.constructors.userCollaction = UserList;
application.constructors.chatListView = ChatListView;
application.constructors.userListView = UserListView;
application.constructors.container = null;

var vent = _.extend({}, Backbone.Events);

var Container = Backbone.View.extend({
	chatList : null,
	userList : null,
	chatCollection: null,
	userCollection: null,

	initialize : function () {

		this.chatCollection = new application.constructors.chatCollaction();
		this.chatList = new application.constructors.chatListView({
			model: this.chatCollection
		});

		this.userCollection = new application.constructors.userCollaction();
		this.userList = new application.constructors.userListView({
			model: this.userCollection
		});
	}
});

window.addEventListener('load', function () {
	var container = new Container();
});
