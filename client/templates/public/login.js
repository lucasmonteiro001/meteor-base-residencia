Template.login.onRendered( () => {
  console.log("login rendered");
});

Template.login.events({
  'submit form': ( event ) => event.preventDefault()
});
