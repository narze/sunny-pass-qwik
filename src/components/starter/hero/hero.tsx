import { component$, useSignal } from "@builder.io/qwik"
import styles from "./hero.module.css"
import { SunnyBg } from "./SunnyBg"

export default component$(() => {
  const node = useSignal<Element>()
  const color = useSignal<string>("#ff0000")

  return (
    <div class={["container", styles.hero]}>
      <h1 class="text-6xl">
        <span class="highlight">Sunny</span> Pass
        <div class="text-3xl mt-2">
          แคล้วคลาด<span class="highlight">พ้นภัย</span>
        </div>
      </h1>

      <div
        ref={node}
        class="flex items-center justify-center relative w-full max-w-5xl aspect-square mx-auto"
      >
        <div class="absolute inset-0 w-full aspect-square z-0">
          <SunnyBg color={color} />
        </div>

        <img
          src="/images/sunny-template.png"
          class="absolute inset-0 w-full aspect-square z-10"
        />
      </div>
    </div>
  )
})
