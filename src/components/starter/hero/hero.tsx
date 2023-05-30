import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"
import styles from "./hero.module.css"
import { SunnyBg } from "./SunnyBg"
import Picker from "vanilla-picker"

// var parent = document.querySelector('#parent');
//     var picker = new Picker(parent);

//     /*
//         You can do what you want with the chosen color using two callbacks: onChange and onDone.
//     */
//     picker.onChange = function(color) {
//         parent.style.background = color.rgbaString;
//     };
export default component$(() => {
  const node = useSignal<Element>()
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

  return (
    <div class={["container", styles.hero]}>
      <h1 class="text-6xl">
        <span class="highlight">Sunny</span> Pass
        <div class="text-3xl mt-2">
          แคล้วคลาด<span class="highlight">พ้นภัย</span>
        </div>
      </h1>

      <div>
        <button
          ref={pickerRef}
          class="bg-blue-500 hover: text-white font-bold py-2 px-4 rounded"
        >
          เปลี่ยนสี
        </button>
      </div>

      <div
        ref={node}
        class="flex items-center justify-center relative w-full max-w-5xl aspect-square mx-auto"
      >
        <div class="absolute inset-0 w-full aspect-square">
          <SunnyBg color={color} />
        </div>

        <img
          src="/images/sunny-template.png"
          class="absolute inset-0 w-full aspect-square"
        />
      </div>
    </div>
  )
})
