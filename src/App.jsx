
import { Button } from './components/ui/button'
import { Terminal } from 'lucide-react'
import useAlert from './cmHooks/useAlert'
import useDialog from './cmHooks/useDialog'
import useDrawer from './cmHooks/useDrawer'
import useSheet from './cmHooks/useSheet'
import useCommand from './cmHooks/useCommand'
import useCarousel from './cmHooks/useCarousel'
import useAlertDialog from './cmHooks/useAlertDialog'
import useCard from './cmHooks/useCard'
import useAreaChart from './cmHooks/charts/useAreaChart'
import useBarChart from './cmHooks/charts/useBarChart'
import useLineChart from './cmHooks/charts/useLineChart'
import usePieChart from './cmHooks/charts/usePieChart'
import useRadialChart from './cmHooks/charts/useRadialChart'
import data from "./data.json"
import useForms from './cmHooks/form/useForms'
import { FormProvider } from 'react-hook-form'
import { Form } from './components/ui/form'

const links = [
  { key: "home", url: "https://example.com/home" },
  { key: "about", url: "https://example.com/about" },
  { key: "services", url: "https://example.com/services" },
  { key: "contact", url: "https://example.com/contact" },
  { key: "blog", url: "https://example.com/blog" },
  { key: "careers", url: "https://example.com/careers" },
  { key: "faq", url: "https://example.com/faq" },
  { key: "support", url: "https://example.com/support" },
  { key: "terms", url: "https://example.com/terms" },
  { key: "privacy", url: "https://example.com/privacy" },
];


console.log(data)

function App() {
  // const [count, setCount] = useState(0)

  const dialogTest = useDialog()
  const drawer = useDrawer()
  const sideSheet = useSheet()
  const command = useCommand()
  const command2 = useCommand()
  const carousel = useCarousel({
    margin: "mx-auto"
  })
  const carousel2 = useCarousel({
    margin: "mx-auto"
  })

  const alertDialog = useAlertDialog()


  // Call the useForms hook, specifying fields to be rendered



  const alert = useAlert({
    variant: "destructive",
    title: "Hello",
    description: "world",
    icon: <Terminal />
  })

  const card = useCard({
    title: "Hello",
    description: "world",
    width: "w-[200px]"
  })


  const colorPalette = [
    "var(--color-rent)",
    "var(--color-groceries)",
    "var(--color-entertainment)",
    "var(--color-utilities)",
    "var(--color-savings)",
    "var(--color-june)",
    "var(--color-july)",
    "var(--color-august)",
    "var(--color-september)",
    "var(--color-october)",
    "var(--color-november)",
    "var(--color-december)",
  ];


  const areaChart = useAreaChart()
  const barChart = useBarChart()
  const lineChart = useLineChart()
  const pieChart = usePieChart(undefined, data, colorPalette)
  const radialChart = useRadialChart()



  // Custom field configurations
  const customFields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea'
    },
    {
      name: 'agreeTerms',
      label: 'I agree to the terms',
      type: 'checkbox'
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' }
      ]
    }
  ];

  const { form, renderFields, handleSubmit } = useForms(customFields);

  const onSubmit = (data) => {
    console.log(data);
  };




  return (
    <>
      <Button variant="destructive"

      >Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary"
        onClick={() => {
          sideSheet.open()
          sideSheet.setTitle("this is a side drawer now sidesheet")
          sideSheet.setDescription("Testing...")
          sideSheet.setSide("right")
        }}
      >SideSheet</Button>
      <Button variant="ghost" onClick={() => {
        drawer.open()
        drawer.setTitle("a drawer from buttom")
        drawer.setDescription("testing....")
      }}>Drawer</Button>
      <Button variant="link"
        onClick={() => {
          alertDialog.open()
          alertDialog.setTitle("Title testing....")
          alertDialog.setDescription("Testing description.....")
        }}
      >Link</Button>
      <Button onClick={() => {
        dialogTest.open()
        dialogTest.setTitle("Title testing....")
        dialogTest.setDescription("Testing description.....")
      }}>Primary</Button>



      {alert.alertJSX()}

      <Button
        onClick={() => {
          command.open();
          // sideSheet.setHeight("h-full")

        }}
      >
        Open Drawer
      </Button>

      {/* Render the dialog */}
      {dialogTest.DialogJSX(
        undefined, // No trigger element
        <p>Dialog Body Content</p>, // Custom body content
        true // Show default footer
      )}


      {drawer.DrawerJSX(
        undefined, // No trigger element
        <p>Drawer Body Content</p> // Custom body content
      )}

      {sideSheet.SheetJSX(
        undefined, // No trigger element
        <>
          <p>Sheet Body Content</p>

          <Button variant="destructive" onClick={() => sideSheet.close()}>Close</Button>
        </>
        // Custom body content
      )}


      {command.CommandDialogJSX(links, "key")}
      {command2.CommandJSX(links, "key")}

      {carousel.CarouselJSX(links, "key", <>
        <p>Just check Carousel</p>
      </>)}


      {
        carousel2.CarouselWithCardJSX()
      }


      {alertDialog.AlertDialogJSX(
        undefined,
        undefined,
        true,
        () => {
          console.log("Continue")
        },
        "Cancel",
        "ok"

      )}

      {/* <div className='bg-red-300 flex flex-row gap-10 items-center  flew-wrap w-full'> */}
      <div className='flex flex-row flex-wrap gap-4 w-full'>
        {links.map((link, index) => (
          card.CardJSX(
            index,
            <p>Just check Card</p>,
            <p>Just check Card</p>
          )
        ))}
      </div>
      {/* </div> */}

      {areaChart.AreaChartJSX()}
      {barChart.BarChartJSX(
        undefined,
        undefined,
        true

      )}

      {lineChart.LineChartJSX(
        undefined, undefined, undefined, undefined
      )}

      {pieChart.PieChartJSX(
        undefined,
        "amount",
        "category",
        "category",
        "Total",

      )}

      {radialChart.RadialChartJSX()}


      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-7">
          {renderFields}
          <Button type="submit">Submit</Button>
        </form>
      </Form>


    </>
  )
}

export default App
