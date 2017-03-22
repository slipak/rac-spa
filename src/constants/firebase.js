import Rebase from 're-base';

const config = {
	apiKey: "AIzaSyAp7RJR0v3Biet2tDtvH18FVY-q4aZtK5Q",
	authDomain: "pizza-a88e9.firebaseapp.com",
	databaseURL: "https://pizza-a88e9.firebaseio.com",
	storageBucket: "pizza-a88e9.appspot.com",
	messagingSenderId: "183712798008"
};

const base = Rebase.createClass(config);

export default base;