## TAKE HOME ASSIGNMENT

Thank you for your continued interest in Ringblaze. 

This backend exerise is designed to take less than 2 hours for someone who is familiar with `Node.js` and `Express`. This is an opportunity to show us your world-class skills in solving problems.

* Write clean code with comments as if you were shipping it.
* You can install any 3rd party package if needed.
* Commit frequently using `git` so we can understand the progress.
* Write test unit when it's relevant. 
* Have additional ideas? We'd love to hear more about it.

After you're done with the assignment, you can send back to us via email or send us a link to your repo. We'll review and get back to you in 1-2 days.

### Details
Your task is to calculate the total price for all the phone calls. The data is in the folder `data/callLog.json`

When we go to `/`, respond the answer in `json` format with the total number calls along with total price. You can calculate the price by following these rules:

> A **toll-free number** is a number that has prefix 800, 833, 866, or 888 after the country code. Otherwise, it's a local number.
> 
> The default country code for any phone number in the data file is `+1` (USA or Canada) if it's missing.
> 
> Note that the phone numbers in the log may have be in different format, with or without the country code.

* For **inbound** or **outbound** call to a local phone number, the cost is `1 cent` for each second.
* For inbound call to a toll-free number, the cost is `3 cents` for each second.
* For outbound call to a toll-free number, the cost is `2 cents` for each second.

Example data returned

```javascript
GET /
{
    totalCalls: 87,
    totalCost: 187273
}
```

Thank you and good luck! 🙏