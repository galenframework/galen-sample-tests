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

To run the defined configuration you have to specify GALEN_CONFIG as environment variable.

```bash
GALEN_CONFIG="galen.hub.json" galen test tests/ --htmlreport reports
```

By default `galen.local.json` configuration file will be used.
