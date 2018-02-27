/*****************************************/
/* Global Variables for Testing Purposes */
/*****************************************/

const moment = require('moment');
const idLocale = require('moment/locale/id'); //for Indonesia locale
moment.locale('id', idLocale);

let pic2 = {
	uri: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Emoji_with_Eyes_Opened_large.png?v=1480481056'
}
let allNames = [
	{
		name: 'Hao Nguyen', 
		ImageLink: {pic2}, 
	},
	{
		name: 'Rahul Sheth',
		ImageLink: {pic2}, 
	}, 
	{
		name: 'Hamilton Tran', 
		ImageLink: {pic2}, 
	},
	{
		name: 'Michael Yu',
		ImageLink: {pic2},
	}
];

const dummyEvents = ["events1", "events2"];

export { moment, idLocale, pic2, allNames, dummyEvents };