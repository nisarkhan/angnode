angular
  .module('sunloan')
  .config(function($routeProvider, $httpProvider) {

      var modules = '../common/modules/';

      $routeProvider

        /* dashboard */
        .when('/', {
          controller: 'dashboard',
          templateUrl: 'dashboard/index.html'
        })

        /* borrower */
        .when('/search/:query', {
          controller: 'borrower.search',
          templateUrl: modules+'borrower/search.html'
        })
        .when('/borrower/:account/loan/:id', {
          controller: 'borrower.loan',
          templateUrl: modules+'borrower/loan.html'
        })
        .when('/borrower/:id', {
          controller: 'borrower',
          templateUrl: modules+'borrower/dashboard.html'
        })

        /* drawers */
        .when('/drawer/cash_transfer/:id?', {
          controller: 'drawer',
          templateUrl: modules+'drawer/cash_transfer.html'
        })
        .when('/drawer/edit/:id', {
          controller: 'drawer',
          templateUrl: modules+'drawer/edit.html'
        })
        .when('/drawer/manage/:id?', {
          controller: 'drawer',
          templateUrl: modules+'drawer/manage.html'
        })

        /* writeoffs */
        .when('/writeoff', {
          controller: 'writeoff',
          templateUrl: modules+'writeoff/index.html'
        })

        /* applications */
        .when('/application/:id?', {
          controller: 'application.create',
          templateUrl: modules+'application/create.html'
        })
        .when('/application/:id/borrower', {
          controller: 'application.borrower',
          templateUrl: modules+'application/borrower.html'
        })
        .when('/application/:id/address', {
          controller: 'application.address',
          templateUrl: modules+'application/address.html'
        })
        .when('/application/:id/options', {
          controller: 'application.options',
          templateUrl: modules+'application/options.html'
        })
        .when('/application/:id/evaluate', {
          controller: 'application.evaluate',
          templateUrl: modules+'application/evaluate.html'
        })
        .when('/application/:id/decline', {
          controller: 'application.decline',
          templateUrl: modules+'application/decline.html'
        })
        .when('/application/:id/letter', {
          controller: 'application.letter',
          templateUrl: modules+'application/letter.html'
        })

        /* loan */
        .when('/loan/:id/rate', {
          controller: 'loan.rate',
          templateUrl: modules+'loan/rate.html'
        })
        .when('/loan/:id/make', {
          controller: 'loan.make',
          templateUrl: modules+'loan/make.html'
        })


        /* checkboxs */
        .when('/check/write', {
          controller: 'check',
          templateUrl: modules+'check/write.html'
        })
        .when('/check/maintenance', {
          controller: 'check',
          templateUrl: modules+'check/maintenance.html'
        })

        /* collection */
        .when('/collection/assign', {
          controller: 'collection',
          templateUrl: modules+'collection/index.html'
        })

        /* reports */
        .when('/reports', {
          controller: 'report',
          templateUrl: modules+'report/index.html'
        })

        /* employees */
        .when('/employees', {
            controller: 'employees',
            templateUrl: modules + 'employee/index.html'
        })

        /* change password */
        .when('/changepassword', {
            controller: 'changepassword',
            templateUrl: modules + 'changepassword/index.html'
        })
        .otherwise({
          redirectTo: '/'
        });

  });
