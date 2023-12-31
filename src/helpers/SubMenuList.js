export default [
  {
    menu: '/ninongs/sales',
    submenu: [
      {
        text: 'Transaction',
        path: 'transactions',
        ico: 'faWallet'
      },
      {
        text: 'Sales History',
        path: 'history'
      }
    ]
  },
  {
    menu: '/ninongs/items'
  },
  {
    menu: '/ninongs/inventory',
    submenu: [
      {
        text: 'Stock on hand',
        path: '/ninongs',
      },
      {

        text: 'Delivery',
        path: '/ninongs',
      },
      {
        text: 'Received Delivery',
        path: '/ninongs'
      },
      {
        text: 'Physical Count',
        path: '/ninongs',
      }
    ]
  },
  {
    menu: '/ninongs/reports',
    submenu: [
      {
        text: 'Sales Report',
        path: '/ninongs',
      },
      {
        text: 'Invetory Report',
        path: '/ninongs',
      },
      {

        text: 'Z-Reading',
        path: '/ninongs',
      },
      {
        text: 'Cashier Attendance',
        path: '/ninongs'
      }
    ]
  },
  {
    menu: '/ninongs/utilities',
    submenu: [
      {
        text: 'Cashier profile',
        path: '/ninongs',
      },
      {
        text: 'Time logs',
        path: '/ninongs'
      },
      {
        text: 'New Cashier',
        path: 'new-cashier'
      },
      {
        text: 'Manage Categories',
        path: 'category'
      }
    ]
  }

]