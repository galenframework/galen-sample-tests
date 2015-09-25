Galen Sample Tests
=====================================

This project is used in order to demonstrate the features of [Galen Framework](http://galenframework.com) and the power of Javascript-based tests

The web application that it is testing is [http://testapp.galenframework.com/](http://testapp.galenframework.com/)

If you have Galen Framework installed you can just checkout this project and run it with the following command:

```
galen test tests/ --htmlreport reports
```

Environments and SeleniumGrid
=====================================

You can create configurations for different environments, like local run, some cloud based service or just remote SeleniumGrid. Look at galen.hub.json as example how to configure it to use with remote SeleniumGrid instance.

To run the defined configuration you have to specify `GALEN_CONFIG` as environment variable.

```bash
GALEN_CONFIG="galen.hub.json" galen test tests/ --htmlreport reports
```

Configuration file
=====================================

By default `galen.local.json` configuration file will be used.

In configuration file it's possible to define `domain` which galen should use as starting point, `gridUrl` in case you use remote Selenium Grid installation and `defaultBrowser`. 

```javascript
{
	"domain" : "testapp.galenframework.com",
	"gridUrl": "http://selenium-grid-url/hub/wd",
	"defaultBrowser": "firefox"
}
```

Also it's possible to keep all test-wide configuration information in this file
under the key `config`. For example to keep test-user credentials.

```javascript
{
	"config": {
		"TEST_USER": {
			"username": "testuser@example.com",
			"password": "test123"
		}
	}
}
```

Run only one test
=====================================

If you would like to run only one test of all of them, it's possible to specify
it using only keyword. It might be useful when you have bunch of tests, but
currently you're working only on one of them.

Just prepend `.only` after `testOnAllDevices` or `testOnDevice` and you're good to
go:

```javascript
testOnAllDevices.only("Login page", "/", function (driver, device) {});
```
