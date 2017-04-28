var UserListView = Backbone.View.extend({
	el: '#chat-info',
	template: _.template($('#form-view').html()),
	events : {
		"click .send":  "send",
		"click #add-user" : "addUser",
		"click .delete" : "deleteUser",
		"click .save-user" : "saveUser",
		"click .delete-last-msg" : "deleteLastMessage"
	},
	inputs : {
		nickname: null,
		color: null,
		message: null
	},
	vent: null,
	initialize : function () {
		var id;

		this.vent = vent;
		this.listenTo(this.model, 'all', this.render);

		id = this.generateId();
		this.model.add({idAttribute: id, nickname: 'Medet Fiftyonesky'});
	},
	render : function () {
		if(!this.template) {
			return false;
		}

		var data, html;

		if(this.model) {
			data = this.model.toJSON();
		}

		html = this.template({model: data});

		this.$el.html(html);
	},
	getFormIndex : function (e) {
		var idx = $(e.currentTarget).closest('.form').index();
		return idx;
	},
	addUser : function () {
		var id = this.generateId();
		this.model.add({idAttribute:id});
	},
	deleteUser : function (e) {
		var formIndex = this.getFormIndex(e);

		console.log(this.model.at(formIndex))

		this.model.at(formIndex).destroy();
	},
	checkNickSaved : function (idx) {
		var isNickSaved;

		isNickSaved = this.model.at(idx).toJSON().nickname;

		if(!isNickSaved) {
			return false;
		}

		return isNickSaved;
	},
	checkIsNickSame : function (nick) {
		//returns array of models with the same nickname
		var isNickSameArray, isNickSame;
		isNickSameArray = this.model.where({nickname: nick});

		if(isNickSameArray.length == 0) {
			isNickSame = false;
			return false
		}

		isNickSame = true;
		return isNickSame;
	},
	generateId : function() {
		var prefix, mainNumber, id;

		prefix = Math.floor((Math.random() * 100) + 1);
		mainNumber = new Date().getTime();

		id = mainNumber + "_" + prefix;
		return id;
	},
	saveUser : function (e) {
		var formIndex, nickname,  isNickSame;
		formIndex = this.getFormIndex(e);

		this.inputs.nickname = $('.nick').eq(formIndex);

		nickname = this.inputs.nickname.val();
		isNickSame = this.checkIsNickSame(nickname);

		if(isNickSame) {
			alert('This nickname is already exist! Try another one');
			return false;
		}

		this.model.at(formIndex).set({
			nickname: nickname
		})
	},
	deleteLastMessage : function (e) {
		var formIndex, modelToChange;

		formIndex = this.getFormIndex(e);

		modelToChange = this.model.at(formIndex);

		this.vent.trigger('deleteLastMessage',
			modelToChange.toJSON().idAttribute
		);
	},
	send : function (e) {
		var formIndex, isNickSaved;
		formIndex = this.getFormIndex(e);
		isNickSaved = this.checkNickSaved(formIndex);

		if(!isNickSaved) {
			alert('You should save your nickname');
			return false
		}

		this.inputs.nickname = this.model.at(formIndex).toJSON().nickname;
		this.inputs.message = $('.msg').eq(formIndex);
		this.inputs.color = $('.color').eq(formIndex);

		if(!this.inputs.nickname || !this.inputs.message.val()) {
			alert('Fill in all fields');
			return false;
		}

		this.vent.trigger('send', {
			userId: this.model.at(formIndex).toJSON().idAttribute,
			nickname: this.inputs.nickname,
			msg: this.inputs.message.val(),
			color: this.inputs.color.val()
		});

		this.model.at(formIndex).set({
			color: this.inputs.color.val()
		});

		this.inputs.message.val('');
	}
});
