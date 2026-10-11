export const features = [
    { slug: 'layout', name: 'Layout', description: 'How many keys live on the deck.', sort_order: 1 },
    { slug: 'case', name: 'Case', description: 'Material and finish of the housing.', sort_order: 2 },
    { slug: 'keycaps', name: 'Keycaps', description: 'The colorway you type on.', sort_order: 3 },
    { slug: 'switches', name: 'Switches', description: 'The feel and sound of every press.', sort_order: 4 },
    { slug: 'lighting', name: 'Lighting', description: 'Backlight under the caps and glow around the case.', sort_order: 5 },
    { slug: 'connectivity', name: 'Connectivity', description: 'How the board talks to your computer.', sort_order: 6 }
]

export const options = [
    { feature: 'layout', slug: '60', name: '60% Compact', price: 0, description: '61 keys. No arrows, no F-row.', meta: { keys: 61 }, sort_order: 1 },
    { feature: 'layout', slug: '65', name: '65%', price: 15, description: '68 keys with a dedicated arrow cluster.', meta: { keys: 68 }, sort_order: 2 },
    { feature: 'layout', slug: 'tkl', name: 'Tenkeyless', price: 30, description: '87 keys. Everything but the numpad.', meta: { keys: 87 }, sort_order: 3 },
    { feature: 'layout', slug: 'full', name: 'Full-size', price: 45, description: '104 keys including the numpad.', meta: { keys: 104 }, sort_order: 4 },

    { feature: 'case', slug: 'plastic-black', name: 'Plastic · Black', price: 0, description: 'Lightweight ABS shell.', meta: { color: '#23252b', material: 'plastic' }, sort_order: 1 },
    { feature: 'case', slug: 'plastic-white', name: 'Plastic · White', price: 0, description: 'Lightweight ABS shell.', meta: { color: '#f2f1ec', material: 'plastic' }, sort_order: 2 },
    { feature: 'case', slug: 'aluminum-silver', name: 'Aluminum · Silver', price: 60, description: 'CNC-milled, anodized.', meta: { color: '#c9ced6', material: 'aluminum' }, sort_order: 3 },
    { feature: 'case', slug: 'aluminum-lavender', name: 'Aluminum · Lavender', price: 70, description: 'CNC-milled, anodized.', meta: { color: '#b9a9ec', material: 'aluminum' }, sort_order: 4 },
    { feature: 'case', slug: 'walnut', name: 'Walnut Wood', price: 80, description: 'Solid walnut, hand oiled.', meta: { color: '#8a5a33', material: 'wood' }, sort_order: 5 },
    { feature: 'case', slug: 'acrylic', name: 'Frosted Acrylic', price: 45, description: 'Translucent shell that diffuses light.', meta: { color: '#e7f0f7', material: 'acrylic' }, sort_order: 6 },

    { feature: 'keycaps', slug: 'midnight', name: 'Midnight', price: 0, description: 'Charcoal with amber accents.', meta: { alpha: '#3a3d46', mod: '#2a2d35', accent: '#f0a35e', legend: '#f4f4f6' }, sort_order: 1 },
    { feature: 'keycaps', slug: 'cloud', name: 'Cloud', price: 0, description: 'Soft white and grey.', meta: { alpha: '#f6f6f3', mod: '#d9dbd6', accent: '#8fb7e6', legend: '#3a3d46' }, sort_order: 2 },
    { feature: 'keycaps', slug: 'pastel-sunset', name: 'Pastel Sunset', price: 35, description: 'Pink, lavender and mint.', meta: { alpha: '#fde2e8', mod: '#d9ccfb', accent: '#b9f0d8', legend: '#5a4a78' }, sort_order: 3 },
    { feature: 'keycaps', slug: 'retro-beige', name: 'Retro Beige', price: 25, description: 'Vintage terminal vibes.', meta: { alpha: '#e9e2cf', mod: '#c6bba0', accent: '#d9603b', legend: '#4a4238' }, sort_order: 4 },
    { feature: 'keycaps', slug: 'blackout', name: 'Blackout', price: 20, description: 'Black on black. Stealth mode.', meta: { alpha: '#17181c', mod: '#101114', accent: '#2a2c33', legend: '#3c3f48' }, sort_order: 5 },
    { feature: 'keycaps', slug: 'pudding', name: 'Pudding', price: 30, description: 'Translucent sides that let the light through.', meta: { alpha: '#ffffff', mod: '#ffffff', accent: '#ffffff', legend: '#1f2024', translucent: true }, sort_order: 6 },

    { feature: 'switches', slug: 'linear-red', name: 'Linear Red', price: 0, description: 'Smooth, light and quiet.', meta: { color: '#e5484d' }, sort_order: 1 },
    { feature: 'switches', slug: 'tactile-brown', name: 'Tactile Brown', price: 10, description: 'A gentle bump on every press.', meta: { color: '#9a6b3f' }, sort_order: 2 },
    { feature: 'switches', slug: 'clicky-blue', name: 'Clicky Blue', price: 10, description: 'Loud and proud.', meta: { color: '#3b82f6' }, sort_order: 3 },
    { feature: 'switches', slug: 'silent-linear', name: 'Silent Linear', price: 25, description: 'Dampened for shared spaces.', meta: { color: '#6b7280' }, sort_order: 4 },
    { feature: 'switches', slug: 'hall-effect', name: 'Hall-Effect Magnetic', price: 40, description: 'Adjustable actuation and rapid trigger.', meta: { color: '#8b5cf6' }, sort_order: 5 },

    { feature: 'lighting', slug: 'none', name: 'No lighting', price: 0, description: 'Keep it classic.', meta: { glow: 'none' }, sort_order: 1 },
    { feature: 'lighting', slug: 'white', name: 'White backlight', price: 15, description: 'Clean single-color glow.', meta: { glow: 'white' }, sort_order: 2 },
    { feature: 'lighting', slug: 'rgb', name: 'Per-key RGB', price: 35, description: 'Every key, any color.', meta: { glow: 'rgb' }, sort_order: 3 },
    { feature: 'lighting', slug: 'rgb-underglow', name: 'Per-key RGB + Underglow', price: 55, description: 'RGB keys plus a halo around the case.', meta: { glow: 'rgb', underglow: true }, sort_order: 4 },

    { feature: 'connectivity', slug: 'wired', name: 'Wired USB-C', price: 0, description: 'Detachable coiled cable.', meta: {}, sort_order: 1 },
    { feature: 'connectivity', slug: 'wireless', name: 'Wireless', price: 25, description: 'Bluetooth 5 and 2.4 GHz dongle.', meta: {}, sort_order: 2 }
]

export const incompatibilities = [
    {
        when_feature: 'case', when_option: 'walnut',
        blocks_feature: 'lighting', blocks_option: 'rgb-underglow',
        message: 'The walnut wood case is opaque, so underglow would be invisible. Choose per-key RGB or a different case.'
    },
    {
        when_feature: 'case', when_option: 'acrylic',
        blocks_feature: 'lighting', blocks_option: 'none',
        message: 'The frosted acrylic case is built to diffuse light. Pick a backlight to go with it.'
    },
    {
        when_feature: 'keycaps', when_option: 'pudding',
        blocks_feature: 'lighting', blocks_option: 'none',
        message: 'Pudding keycaps are translucent and need a backlight for their legends to read well.'
    },
    {
        when_feature: 'connectivity', when_option: 'wireless',
        blocks_feature: 'lighting', blocks_option: 'rgb-underglow',
        message: 'Underglow drains the battery too fast on a wireless board. Choose per-key RGB or go wired.'
    },
    {
        when_feature: 'connectivity', when_option: 'wireless',
        blocks_feature: 'switches', blocks_option: 'hall-effect',
        message: 'Hall-effect switches need constant power and are only offered on wired boards.'
    }
]

export const sampleKeyboards = [
    { name: 'Pastel Dream', layout: '65', case: 'aluminum-lavender', keycaps: 'pastel-sunset', switches: 'silent-linear', lighting: 'rgb', connectivity: 'wireless' },
    { name: 'Office Workhorse', layout: 'full', case: 'plastic-black', keycaps: 'cloud', switches: 'tactile-brown', lighting: 'white', connectivity: 'wired' },
    { name: 'Walnut Minimal', layout: '60', case: 'walnut', keycaps: 'retro-beige', switches: 'linear-red', lighting: 'none', connectivity: 'wired' }
]
