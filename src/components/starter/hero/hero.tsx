import {
  type NoSerialize,
  component$,
  noSerialize,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik"
import styles from "./hero.module.css"
import Picker from "vanilla-picker"
import { saveAs } from "file-saver"
import { copyImageToClipboard } from "copy-image-clipboard"
import * as htmlToImage from "html-to-image"

export default component$(() => {
  const color = useSignal<string>("#ff7300")
  const pickerRef = useSignal<HTMLElement>()

  useVisibleTask$(() => {
    const picker = new Picker({
      parent: pickerRef.value,
      color: color.value,
      alpha: false,
    })

    picker.onChange = (pickedColor) => {
      color.value = pickedColor.rgbString
    }
  })

  useVisibleTask$(({ track }) => {
    track(() => {
      color.value
    })

    document.getElementById("bg-svg")!.style.fill = color.value
  })

  const fns = useStore<{
    copyImage: NoSerialize<() => void>
    saveImage: NoSerialize<() => void>
  }>({
    copyImage: undefined,
    saveImage: undefined,
  })

  useVisibleTask$(() => {
    fns.copyImage = noSerialize(() => {
      htmlToImage
        .toPng(document.getElementById("img")!)
        .then(function (dataUrl) {
          console.log({ dataUrl })

          const img = new Image()
          img.src = dataUrl
          copyImageToClipboard(img.src)
          // saving = false
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error)
          console.log(error.message)
        })
      // isCopy = !isCopy
      // setTimeout(() => {
      //   isCopy = !isCopy
      // }, 5000)
    })

    fns.saveImage = noSerialize(() => {
      htmlToImage
        .toPng(document.getElementById("img")!)
        .then(function (blob) {
          saveAs(blob, `sunny-pass.png`)
          // saving = false
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error)
        })
    })
  })

  return (
    <div class={["container", styles.hero]}>
      <h1 class="text-6xl">
        <span class="highlight">Sunny</span> Pass
        <div class="text-3xl mt-2">
          แคล้วคลาด<span class="highlight">พ้นภัย</span>
        </div>
      </h1>

      <div class="flex gap-4">
        <button
          ref={pickerRef}
          class="bg-blue-500 hover: text-white font-bold py-2 px-4 rounded"
        >
          เปลี่ยนสี
        </button>
        <button
          onClick$={() => fns.copyImage!()}
          class="bg-blue-500 hover: text-white font-bold py-2 px-4 rounded"
        >
          ก็อปภาพ
        </button>
        <button
          onClick$={() => fns.saveImage!()}
          class="bg-blue-500 hover: text-white font-bold py-2 px-4 rounded"
        >
          เซฟภาพ
        </button>
      </div>

      <div
        class="flex items-center justify-center relative w-full max-w-5xl aspect-square mx-auto"
        id="img"
      >
        <div class="absolute text-black inset-0 w-full aspect-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 900 900"
            style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <path
                // fill={color.value} THIS SHIT WON'T WORK
                fill="orange"
                id="bg-svg"
                d="M 433.5,60.5 C 444.164,60.99 447.997,66.3234 445,76.5C 440.48,80.3899 439.48,84.7232 442,89.5C 444.921,91.7121 448.088,93.5455 451.5,95C 485.962,102.147 511.128,121.314 527,152.5C 528.871,158.447 530.538,164.447 532,170.5C 546.743,154.881 564.909,146.381 586.5,145C 596.833,144.667 607.167,144.333 617.5,144C 628.869,143.1 639.202,139.434 648.5,133C 651.588,128.157 654.921,123.491 658.5,119C 664.231,116.479 669.064,117.646 673,122.5C 675.059,126.677 676.726,131.01 678,135.5C 678.245,151.194 677.912,166.861 677,182.5C 687.738,207.175 688.238,232.009 678.5,257C 705.478,251.269 732.145,252.602 758.5,261C 775.944,266.783 789.11,277.617 798,293.5C 798.841,302.504 794.674,307.504 785.5,308.5C 783.165,311.166 781.331,314.166 780,317.5C 775.951,330.892 773.284,344.559 772,358.5C 768.374,374.092 760.874,387.426 749.5,398.5C 759.453,403.143 769.119,408.31 778.5,414C 796.235,429.733 812.568,446.733 827.5,465C 833.237,470.536 839.904,474.536 847.5,477C 854.167,483.333 854.167,489.667 847.5,496C 844.167,498 840.833,500 837.5,502C 818.893,518.269 800.56,534.936 782.5,552C 767.655,561.724 751.321,566.391 733.5,566C 756.673,589.835 774.173,617.335 786,648.5C 787.817,653.528 787.817,658.528 786,663.5C 784.363,665.81 782.196,667.31 779.5,668C 754.608,664.96 732.275,671.293 712.5,687C 696.252,694.483 679.585,695.483 662.5,690C 658.921,688.294 655.421,686.461 652,684.5C 654.306,697.853 655.806,711.353 656.5,725C 654.054,758.382 642.554,788.215 622,814.5C 615.941,822.788 609.275,823.455 602,816.5C 600.496,810.979 598.496,805.645 596,800.5C 591.652,796.242 586.486,793.408 580.5,792C 569.134,790.163 557.8,788.163 546.5,786C 530.635,778.467 519.135,766.634 512,750.5C 506.786,761.724 499.286,771.224 489.5,779C 480.669,784.917 471.669,790.583 462.5,796C 452.295,804.021 450.462,813.521 457,824.5C 457.781,832.224 454.281,836.557 446.5,837.5C 420.751,831.882 399.251,819.215 382,799.5C 372.134,785.408 366.3,769.742 364.5,752.5C 346.557,769.637 325.224,780.137 300.5,784C 284.563,787.391 268.563,788.058 252.5,786C 249.123,783.545 247.457,780.211 247.5,776C 250.958,766.126 252.458,755.959 252,745.5C 248.929,735.957 245.262,726.623 241,717.5C 237.157,703.291 236.491,688.957 239,674.5C 224.772,682.566 209.605,685.066 193.5,682C 179.833,675 166.167,668 152.5,661C 142.753,657.508 133.087,657.675 123.5,661.5C 118.535,661.369 115.035,659.036 113,654.5C 113.031,631.647 117.364,609.647 126,588.5C 133.182,573.316 143.349,560.483 156.5,550C 145.814,547.655 135.814,543.655 126.5,538C 114.167,527.667 101.833,517.333 89.5,507C 78.6709,498.584 66.6709,492.251 53.5,488C 46.8333,482 46.8333,476 53.5,470C 59.4492,468.027 64.7825,465.027 69.5,461C 83.1331,445.699 97.1331,430.699 111.5,416C 123.241,405.458 136.574,397.458 151.5,392C 137.787,381.592 129.954,367.758 128,350.5C 127.661,339.105 126.661,327.771 125,316.5C 124.267,304.763 118.1,298.93 106.5,299C 100.12,292.795 99.9531,286.295 106,279.5C 121.383,261.555 140.883,251.055 164.5,248C 183.163,245.468 201.663,246.301 220,250.5C 220.5,250.167 221,249.833 221.5,249.5C 218.067,240.833 216.233,231.833 216,222.5C 214.447,194.016 215.78,165.683 220,137.5C 221.342,127.781 225.175,119.281 231.5,112C 235.167,110 238.833,110 242.5,112C 246.662,118.495 252.328,123.162 259.5,126C 276.617,130.409 293.951,133.742 311.5,136C 325.053,138.74 338.053,143.073 350.5,149C 354.951,151.783 359.117,154.95 363,158.5C 366.27,121.111 383.104,91.6114 413.5,70C 420.147,66.5072 426.813,63.3406 433.5,60.5 Z"
              />
            </g>
          </svg>
        </div>

        <img
          src="/images/sunny-template.png"
          class="absolute inset-0 w-full aspect-square"
        />
      </div>
    </div>
  )
})
