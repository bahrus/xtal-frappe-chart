# \<xtal-frappe-chart\>

Web component wrapper around the frappe chart library

The usage of this web component is quite straightforward

##  Why should we use framework agnostic components?

Take a look at this [chart showing JavaScript Framework marketshare](https://w3techs.com/technologies/overview/javascript_library/all), based on the top 10 million web sites.  If you are building a library that only works with Angular or React or Vue (for example), you are writing off 99% of websites.  Why?

One could assume JQuery, but what benefits does JQuery really bring to the table, with modern browsers?  [Less and less](https://css-tricks.com/now-ever-might-not-need-jquery/).  You are still writing off ~25% of web sites, and that number will likely grow as the need for supporting legacy browsers (IE11) fades. 

Most library authors, who want their library to see wide adoption, realize this fundamental truth.

## What does a framework agnostic api look like?

Typically, a framework agnostic imperative API looks as follows:

const myUIElement = SomeFunction({
    container: myContainerElementorSelector
    data:{

    },
    config:{

    }
});

Some will use a class rather than function.  But such a simple api can be used pretty much anywhere JavaScript is supported.  That's great.  So why not stop there?

## Benefits of 

<!-- Most JavaScript libraries know enough not to do this.    -->



## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
