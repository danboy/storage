Simple offline html storage construct.

set it up:

var foo = new Groupon.storage();

foo.save('key_name', 'key_data');
Saves your info to local storage. will attempt to strigify JSON.
Also adds a updated_at timestamp.

foo.get('key_name');
returns your storage data object. it will attempt to parse JSON.


foo.isStale('key_name');
check's if keyname is stale, currently date-1, but will update to allow
us to pass a time value.

foo.supported();
check's if browser supports offile data.
