import mergeRoute from 'components/merge-routes'
import { ReduxPage } from 'pages/couter'

export default mergeRoute([
  {
    path: '/count',
    tmpl: ReduxPage
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
