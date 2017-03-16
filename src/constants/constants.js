import Rebase from 're-base';

var config = {
  apiKey: "AIzaSyCvfMMD6rFIX12XM2qVqwfH1MeyixfbGiw",
  authDomain: "rac-spa.firebaseapp.com",
  databaseURL: "https://rac-spa.firebaseio.com",
  storageBucket: "rac-spa.appspot.com",
  messagingSenderId: "611734579218"
};

const base = Rebase.createClass(config);

export default base;