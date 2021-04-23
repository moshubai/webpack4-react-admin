import mergeRoute from 'components/merge-routes'
import { ReduxPage, CountDetails } from 'pages/couter'

export default mergeRoute([
  {
    path: '/count/:id/:type',
    tmpl: ReduxPage,
    children: [
      {
        path: '/details',
        tmpl: CountDetails,
      }
    ]

  },
  // {
  //   path: '/example',
  //   tmpl: ExampleHome,
  //   children: [
  //     {
  //       path: '/test',
  //       tmpl: ExampleTest,
  //       children: [
  //         {
  //           path: '/jinzhi',
  //           tmpl: Jinzhi,
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/xiaozhu',
  //   tmpl: Xiaozhu
  // },
])
