# CloudFoundry Management Console (CFMC)

CloudFoundry Management Console (CFMC) is a web console for CloudFoundry V2.

# Requirements

* CloudFoundry Management Console requires the Java7 JDK installed locally. This project is a branch of https://github.com/ravanrijn/styx. The improvements are mostly under the cover 
and are as follows:

- Migration to Spring Framework 4.0.X
- Migration to Angular 1.2.5
- Angular UI Bootstrap
- Angular UI Router
- Migration to Bootstrap 3

# Installation

1. Register CloudFoundry Management Console (CFMC) as client in the UAA (optional, you can also run CloudFoundry Management Console as client cf).
2. Update cfc.properties in src/main/resources with the base URLs to your Cloud Foundry API and UAA and the client id
   and client secret you used to register Styx (use client id cf and leave client secret empty to run as cf).
3. Create a new war using mvn clean package
4. Push CloudFoundry Management Console (CFMC) to your Cloud Foundry

# Enable UAA username feature

For some reason the Cloud Foundry API does not return user names for any operation. As a workaround you can enable
an endpoint on the UAA that will return the user names.

In your BOSH deployment descriptor enable the following setting:

scim:
    userids_enabled: true

# Screenshots

![App Spaces](https://raw.github.com/jhiemer/cfc/master/app-spaces.png)
![App](https://raw.github.com/jhiemer/cfc/master/application-details.png)

# Copyright and license

CloudFoundry Management Console has been built using [Bootstrap](http://getbootstrap.com/) which has the
[Apache 2.0 license](https://github.com/twbs/bootstrap/blob/master/LICENSE)
and [AngularJS](http://angularjs.org/) which has the
[MIT license](https://github.com/angular/angular.js/blob/master/LICENSE).




