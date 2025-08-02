
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export const INTERLOCUTOR_VOICES = [
  'Aoede',
  'Charon',
  'Fenrir',
  'Kore',
  'Leda',
  'Orus',
  'Puck',
  'Zephyr',
] as const;

export type INTERLOCUTOR_VOICE = (typeof INTERLOCUTOR_VOICES)[number];

export type Agent = {
  id: string;
  name: string;
  personality: string;
  bodyColor: string;
  voice: INTERLOCUTOR_VOICE;
  knowledgeBase: string;
  menuDescription?: string;
};

export const AGENT_COLORS = [
  '#58A6FF', // Brighter Blue (new primary accent)
  '#F07178', // Coral Red
  '#F7B829', // Warm Yellow
  '#4CAF50', // Green
  '#FF9800', // Orange
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#00BCD4', // Cyan
];

const tableAndApronKnowledgeBase = `**Restaurant Knowledge Base**

**Restaurant Details**

*   **Name:** Table & Apron
*   **Address:** 23, Jalan SS 20 11, Damansara Kim, 47400 Petaling Jaya, Selangor
*   **Phone:** +60 0377334000
*   **WhatsApp Link:** https://wa.me/600377334000
*   **Booking Link:** https://reservation.umai.io/en/widget/table-apron
*   **Map Link:** https://maps.app.goo.gl/wsYqjXthNEHbsiEe6
*   **Operating Hours:**
    *   Monday: Closed
    *   Tuesday: 05:30 - 22:30
    *   Wednesday: 05:30 - 22:00
    *   Thursday: 05:30 - 22:30
    *   Friday: 11:30 - 22:30 (Lunch shift: 11:30-15:00, Dinner shift: 17:30-22:30)
    *   Saturday: 11:30 - 22:30 (Lunch shift: 11:30-15:00, Dinner shift: 17:30-22:30)
    *   Sunday: 11:30 - 22:30 (Lunch shift: 11:30-15:00, Dinner shift: 17:30-22:30)
*   **Description:** Experience the perfect blend of international flavours and local ingredients at our award-winning restaurant.

**Operational Procedures (Restaurant Operations Knowledge Base)**

*   **Handling Allergies:**
    1.  Verbally confirm allergy with guest and ask about severity.
    2.  Clearly note allergy on order ticket using designated POS modifiers (e.g., "ALLERGY: NUTS").
    3.  Inform kitchen staff (Chef or Sous Chef) directly.
    4.  For severe allergies (anaphylaxis risk), manager must be notified immediately.
    5.  Kitchen should use designated purple allergy kits/utensils and a separate prep area if possible.
    6.  Confirm with Chef that the dish is safe before serving.
    7.  Food runner/server delivering the dish should re-confirm with the guest.
*   **Table Turnover Goal:** Less than 2 minutes after guest departure for reset.
*   **POS System:** Item codes are listed on the menu cheat sheet by the terminal. Modifiers for "no onion", "extra spicy", "medium-rare", and "ALLERGY" are critical. Ensure all special requests are entered.
*   **Wine Service (Full Bottle):**
    1.  Present bottle to host, confirming selection.
    2.  Open bottle at table (unless it's a screw cap that guest prefers to open).
    3.  Offer a small taste (approximately 1oz) to the host for approval.
    4.  If approved, pour for guests: ladies first, then gentlemen, then the host last. Fill to an appropriate level (e.g., 1/3 for red, 1/2 for white).
    5.  Place bottle within reach of the host, or in an ice bucket if white/rosé.

**Menu Items**

**Food**

*   **BREAD & SPREAD**
    *   **Sourdough w/ Truffle Butter:**
        *   Ingredients: Truffle paste, porcini mushroom powder, red onion.
        *   Portion Size: 35g.
        *   Dietary Info: ["dairy", "onion"].
        *   Allergens: [].
        *   Price: 19.
        *   Takeaway Available: TRUE.
    *   **Sourdough w/ Smoked Mackerel Pate:**
        *   Ingredients: Smoked mackerel, onion, ricotta, green onion, lemon, cilantro, black pepper.
        *   Portion Size: 70g.
        *   Dietary Info: ["d iry", "onion", "s afood"].
        *   Allergens: [].
        *   Price: 25.
        *   Takeaway Available: TRUE.
    *   **Ciabatta w/ Hummus, Herbs, Raw Onion:**
        *   Ingredients: Green olive, It lian flat parsley, red onion, confit garlic, chickpea, paprika powder, sesame, lemon juice (serve w/ ciabatta).
        *   Portion Size: 2-3pax.
        *   Dietary Info: ["on on", "garlic", "sesame", "glut n"].
        *   Allergens: [].
        *   Price: 23.
        *   Takeaway Available: TRUE.
*   **SMALL / VEGETABLE**
    *   **Soup of the Day:** In rotation (tomato, cauliflower, pumpkin, carrot ginger soup).
        *   *Example: Carrot Ginger Soup:*
            *   Ingredients: Vegetable stock, carrot, ginger, cream.
        *   Portion Size: 2-3 pax.
        *   Dietary Info: ["dairy", "garlic", "onion"].
        *   Allergens: [].
        *   Price: 22.
        *   Takeaway Available: TRUE.
    *   **Crispy Eggplant w/ Spicy Kicap Manis:**
        *   Ingredients: Buckwheat fried eggplant, sesame seed, cilantro, kicap manis, chili oil.
        *   Portion Size: 2-3pax.
        *   Dietary Info: ["chili o l", "sesame seed"].
        *   Allergens: [].
        *   Price: 26.
        *   Takeaway Available: TRUE.
    *   **Roasted Cauliflower & Ricotta:**
        *   Ingredients: Ricotta cheese dressing, pickled onion, celery, bread crumbs.
        *   Portion Size: 2-3 pax.
        *   Dietary Info: ["dairy", "gluten", "onion"].
        *   Allergens: [].
        *   Price: 27.
        *   Takeaway Available: TRUE.
    *   **Kale & Lettuce Salad w/ Anchovy Dressing:**
        *   Ingredients: Carket kale, Tuscan kale, Cherokee lettuce, red giant mustard, pear, shaved onion, anchovy, lemon dressing, candied pecan nut, Dijon mustard, cream, butter.
        *   Portion Size: 2-3 pax.
        *   Dietary Info: ["dairy", "nut", "seafood", " i "].
        *   Allergens: [].
        *   Price: 35.
        *   Takeaway Available: TRUE.
    *   **Paku Salad with Green Mango:**
        *   Ingredients: Paku, raw onion, fried shallot, dry shrimp, tamarind dressing, chili oil, peanut crumbs, cherry tomato.
        *   Portion Size: 110g / 2-3 pax.
        *   Dietary Info: ["on on", "peanut", "dry shrimps", "chili oil"].
        *   Allergens: [].
        *   Price: 25.
        *   Takeaway Available: TRUE.
*   **PASTA / RICE**
    *   **Casarecce al Ragù:**
        *   Ingredients: Pork or beef, padano cheese (cannot remove), parsley, egg, flour, tomato, carrot, celery, onion.
        *   Portion Size: 2 pax.
        *   Dietary Info: ["wine", "dai y", "glu en", "egg", "onion", "celery"].
        *   Allergens: [].
        *   Price: 45.
        *   Takeaway Available: TRUE.
    *   **Miso Mushroom Fettuccine:**
        *   Ingredients: Shimeiji, mushroom duxelle, balsamic glazed maitake, porchini powder, cream, green onion, miso.
        *   Portion Size: 2-3 pax.
        *   Dietary Info: ["bean", "dairy", "gluten", "egg", "garlic", "onion"].
        *   Allergens: [].
        *   Price: 39.
        *   Takeaway Available: TRUE.
    *   **Ulam Rice w/ Smoked Mackerel:**
        *   Ingredients: Rice, smo d mackerel, cucumber, tomato, kaffir lime leaf, chili, sambal, anchovy, shallot, coconut milk.
        *   Portion Size: 2-3 pax.
        *   Dietary Info: ["seafood", "coconut", "chili", "onion"].
        *   Allergens: [].
        *   Price: 40.
        *   Takeaway Available: TRUE.
*   **LARGE / SHARING PLATE**
    *   **Buckwheat fried chicken:**
        *   Ingredients: Buckwheat fried chicken, thighs & drums, Thai basil.
        *   Portion Size: 3 / 6 (51).
        *   Dietary Info: ["gluten"].
        *   Allergens: null.
        *   Price: 27.
        *   Takeaway Available: TRUE.
    *   **Pork ribs, pineapple glaze:**
        *   Ingredients: Ribs, pineapple & ketchup glaze, spiced rub, tamarind & chili dip.
        *   Portion Size: half / full (4 / 8 pcs).
        *   Dietary Info: ["chili", "garlic", "seafood (LP)"].
        *   Allergens: null.
        *   Price: 48.
        *   Takeaway Available: TRUE.
    *   **Roast Tilapia with harissa:**
        *   Ingredients: Til pia, harissa paste, pickled onion, ulam and micro herbs (marigold), calamansi, curry leaf oil.
        *   Portion Size: 700g-1200g.
        *   Dietary Info: [].
        *   Allergens: null.
        *   Price: "RM13/100G".
        *   Takeaway Available: TRUE.
    *   **Red snapper fillet w/ Shao Xing beurre blanc:**
        *   Ingredients: Red snapper, Shao Xing wine, baby kailan, butter sauce (pickle daikon, kuchai, red onion).
        *   Portion Size: 180g / 2pax.
        *   Dietary Info: ["seafood", "alcohol", "dairy", "oni "].
        *   Allergens: null.
        *   Price: 55.
        *   Takeaway Available: FALSE.
    *   **Angus Flank Steak w/ Watercress Salad:**
        *   Ingredients: Chimichurri, dijon mustard, watercress salad, dill, onion.
        *   Portion Size: 150g/200g/250g/300g.
        *   Dietary Info: ["butter", "garlic", "shellfish", "onion"].
        *   Allergens: null.
        *   Price: 68.
        *   Takeaway Available: FALSE.
    *   **Pork chop with Watercress Salad:**
        *   Ingredients: Pork chop, brown butter, whole garlic, capers pork jus, parsley, red onion, watercress salad.
        *   Portion Size: "M(450-499g)/L RM85(500-550g)".
        *   Dietary Info: ["dairy", "ga lic", "onion"].
        *   Allergens: null.
        *   Price: "75 (for M), RM85 (for L)".
        *   Takeaway Available: TRUE.
*   **DESSERTS**
    *   **Eggnog Bread Pudding Brulee:**
        *   Ingredients: Vie noiseri (cinnamon roll, almond, chocolate), rum-eggnog, vanilla sauce, OLIVE OIL, Brulee, spices.
        *   Portion Size: 2-3pax.
        *   Dietary Info: ["alcohol", "almond", "egg", "dairy", "n l"].
        *   Allergens: null.
        *   Price: 29.
        *   Takeaway Available: FALSE.
    *   **Sweet Corn Creme brulee:**
        *   Ingredients: White pearl corn, milk, butter, cream, egg.
        *   Portion Size: 2 pax.
        *   Dietary Info: ["dairy", "egg"].
        *   Allergens: null.
        *   Price: 23.
        *   Takeaway Available: FALSE.
    *   **Tiramisu:**
        *   Ingredients: Lady fingers, Kahlúa coffee liqueur, rum, mascarpone, cocoa powder.
        *   Portion Size: 1 slice.
        *   Dietary Info: ["alcohol", "glut n", "dairy", "egg"].
        *   Allergens: null.
        *   Price: 27.
        *   Takeaway Available: TRUE.
*   **WEEKEND SPECIALS**
    *   **Ciabatta w/ Mushroom Parfait:**
        *   Ingredients: Button mushroom, king oyster, morel mushroom, shiitake, oyster mushroom, egg, cream, milk, soy sauce, wine reduction, parsley.
        *   Portion Size: "2–3 p".
        *   Dietary Info: [""gluten"", ""dairy"", ""soy""].
        *   Allergens: [].
        *   Price: 25.
        *   Takeaway Available: TRUE.
    *   **Confit Duck Salad:**
        *   Ingredients: Shredded confit duck meat, kumquat syrup, calamansi, olive oil, dry cranberries, watercress, swiss chard, romaine, yellow onion.
        *   Portion Size: "2–3 p".
        *   Dietary Info: [""on on"", ""cit us"", ""ber y""].
        *   Allergens: [].
        *   Price: 28.
        *   Takeaway Available: TRUE.
    *   **Salmon Coulibiac:**
        *   Ingredients: Seasoned basmati rice, salmon, grainy mustard, pickled beetroot, puff pastry, egg wash.
        *   Portion Size: "2–3 p".
        *   Dietary Info: [""onion"", ""dairy"", ""alcohol"", ""se food"", ""gluten""].
        *   Allergens: [].
        *   Price: 62.
        *   Takeaway Available: FALSE.
    *   **Pistachio Pound Cake:**
        *   Ingredients: Ground almond, pistachio, egg, butter, milk, flour. Garnish: fig, raspberry, blueberry, pistachio, olive oil, sea salt, egg mascarpone cream.
        *   Portion Size: "2–3 p".
        *   Dietary Info: [""gluten"", ""egg"", ""dairy"", ""nuts""].
        *   Allergens: [].
        *   Price: 27.
        *   Takeaway Available: TRUE.

**Beverages**

*   **Craft Drinks**
    *   **Earl Grey Milk Tea:** Creamy milk tea with Earl Grey, salted cream, and traditional gula melaka.
        *   Dietary Info: ["dairy", "s gar"].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: Glass.
        *   Price: 16.
    *   **Mango Passion Fizz:** Tropical blend of mango and passionfruit with a citrus finish.
        *   Dietary Info: ["sugar"].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: Glass.
        *   Price: 15.
    *   **Pineapple & Assam Boi:** Sweet and tangy pineapple juice with assam boi for a unique twist.
        *   Dietary Info: ["sugar"].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: Glass.
        *   Price: 15.
    *   **Passion Fruit Mojito:** Fresh passion fruit, mint leaves, lime juice, and soda water.
        *   Dietary Info: [].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: Glass.
        *   Price: 18.
*   **Non-Alcoholic Wine**
    *   **L'antidote:** Bubbly drink from Beaujolais with Gamay grapes and vineyard herbs.
        *   Dietary Info: [].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: Bottle.
        *   Price: 145.
    *   **Alcohol-Free Rosé:** De-alcoholized rosé with hibiscus and rose notes.
        *   Dietary Info: [].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: Glass.
        *   Price: 28.
*   **Sharing Jug**
    *   **Lemongrass & Ginger Fizz:** Refreshing fizzy drink with lemongrass and ginger.
        *   Dietary Info: ["sugar"].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: "Pitcher (4-6)".
        *   Price: 26.
    *   **Passionfruit Oolong Tea:** Cold-brewed oolong tea with fresh passionfruit pulp and honey.
        *   Dietary Info: [].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: "1 liter".
        *   Price: 26.
    *   **Lime & Cucumber Fizz:** Cooling cucumber with bright citrus notes.
        *   Dietary Info: ["sugar"].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: "Pitcher (4-6)".
        *   Price: 28.
    *   **Passionfruit & Mint Cooler:** Bright, tropical passionfruit with cooling mint and a hint of citrus.
        *   Dietary Info: ["sugar"].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: "Pitcher (4-6)".
        *   Price: 29.
    *   **Tropical Sunshine:** Vibrant blend of pineapple, passionfruit and green apple juices.
        *   Dietary Info: [].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: "Carafe (2-3)".
        *   Price: 26.
    *   **Beet the Heat:** Fresh cold-pressed beetroot, carrot and apple with a hint of mint.
        *   Dietary Info: [].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: "Carafe (2-3)".
        *   Price: 26.
*   **Soda**
    *   **Artisanal Cola:** House-made cola with cinnamon, nutmeg, and citrus zest.
        *   Dietary Info: [].
        *   Is Cold: TRUE. Is Hot: FALSE.
        *   Serving Size: "350ml".
        *   Price: 12.

**Wine**

*   **House Pour - White**
    *   **Lawson's Dry Hills Inviniti Sauvignon Blanc 2023**
        *   Category: House Pour - White
        *   Origin: Marlborough, New Zealand
        *   Grape(s): Sauvignon Blanc
        *   Year: 2023
        *   Serving Size: Glass/Bottle
        *   Price: RM32/RM155
        *   Detailed Information:
            *   Flavor Profile: Vibrant and fruit-forward with classic Marlborough Sauvignon Blanc characteristics.
            *   Taste: Crisp and dry with lovely concentration. Notes of zesty citrus (grapefruit, lemon), prominent passionfruit, and fresh herbaceous hints. High acidity.
            *   Aromatic Notes: Lifted aromatics with passionfruit, citrus and fresh herbaceous notes.
            *   Food Pairing: Ideal on its own or with seafood, salads, dishes with fresh summer herbs, soft cheeses, or as a contrast to richer dishes such as those with creamy sauces. Pairs well with restaurant items like Roast Tilapia, Red Snapper Fillet, Paku Salad, or Kale & Lettuce Salad.
        *   Selling Points/Highlights:
            *   Quintessential Marlborough Sauvignon Blanc, known for its punchy, expressive style.
            *   Lawson's Dry Hills is a reputable producer, independently certified 100% sustainable and made at their certified net carbonzero winery.
            *   Lightweight bottles made with minimum 60% recycled content; labels from FSC certified forests.
            *   Offers good value and a reliable, crowd-pleasing profile as a house pour.
        *   Winemaking:
            *   Natural/Non-Natural: Certified 100% sustainable, made in a net carbonzero winery. Focus on environmentally conscious practices.
            *   Production Style: Grapes selected from various vineyard sites across Marlborough, picked when ripe with intense passionfruit flavors. Gently pressed, cool fermented in stainless steel to retain aromatics and flavors. Blended and bottled.
            *   Winery/Region History: Marlborough gained international fame for its distinctive Sauvignon Blanc. Lawson's Dry Hills, established in 1992, is recognized for quality and sustainability in the region. The Inviniti symbol represents continuous respect and care for the environment.
    *   **Domaine de Majas Blanc 2022**
        *   Category: House Pour - White
        *   Origin: Roussillon, France
        *   Grape(s): Macabeu Blend (Likely Macabeu, possibly with Rolle (Vermentino) or Grenache Blanc, common in the region).
        *   Year: 2022
        *   Serving Size: Glass/Bottle
        *   Price: RM35/RM185
        *   Detailed Information:
            *   Flavor Profile: Elegant and mineral-driven white blend. Can exhibit a range of flavors from subtle white fruits to more herbal and stony notes.
            *   Taste: Typically dry, with good acidity. Flavors might include green apple, pear, citrus zest, white peach, and a distinct stony minerality characteristic of Roussillon. May have a slightly saline finish.
            *   Aromatic Notes: Floral notes, potentially with hints of fresh herbs, citrus blossom, and wet stone.
            *   Food Pairing: Versatile with seafood, poultry, salads, and light pasta dishes. Consider pairing with the restaurant's Roasted Cauliflower & Ricotta or Miso Mushroom Fettuccine.
        *   Selling Points/Highlights:
            *   From the Roussillon region in Southern France, known for its diverse terroir and characterful wines.
            *   Domaine de Majas is known for organic/natural farming practices (though the specific cuvée in is different, this ethos often applies across a producer's range).
            *   Offers a taste of a less common French white blend, highlighting the Macabeu grape.
        *   Winemaking:
            *   Natural/Non-Natural: Domaine de Majas is farmed organically. Wines are often made with minimal intervention, spontaneous fermentation, and low sulphur.
            *   Production Style: Likely stainless steel fermentation to preserve freshness and primary fruit characters. Focus on expressing the terroir.
            *   Winery/Region History: Roussillon has a long winemaking history, with a focus on old vines and indigenous varieties. Domaine de Majas, run by Agnès and Alain Carrère, is part of a movement of quality-focused, terroir-driven producers in the region, often working with consultant Tom Lubbe of Domaine Matassa.
*   **House Pour - Red**
    *   **Lawson's Dry Hills Inviniti Pinot Noir (Year on Rotation, e.g., 2021)**
        *   Category: House Pour - Red
        *   Origin: Wairau Valley, New Zealand
        *   Grape(s): Pinot Noir
        *   Year: On rotation (e.g., 2021, 2018/2019 mentioned in sources)
        *   Serving Size: Glass/Bottle
        *   Price: RM32/RM155
        *   Detailed Information:
            *   Flavor Profile: Medium-bodied with red fruit and subtle earthy notes.
            *   Taste: Ripe berry flavors (strawberry, raspberry) matched with a lovely soft mouthfeel and fine silky tannins. May have a touch of smoky, vanillin oak depending on the vintage and specific batch.
            *   Aromatic Notes: Warm, inviting nose of strawberry, raspberry, and potentially a hint of smoky, vanillin oak. Bright cherry characters are also typical for their Inviniti Pinot Noir.
            *   Food Pairing: Versatile with hot ham, pork, chicken, light red meat dishes, grilled dishes, seared tuna, stews and casseroles, pizza and pasta. Could pair with the restaurant's Casarecce al Ragù or Pork Chop.
        *   Selling Points/Highlights:
            *   Showcases the elegant and fruit-driven style of Marlborough Pinot Noir.
            *   From Lawson's Dry Hills, emphasizing sustainability and quality.
            *   "Inviniti" line represents expressive Marlborough wines with a commitment to environmental care.
        *   Winemaking:
            *   Natural/Non-Natural: Produced with sustainable practices at a net carbonzero winery.
            *   Production Style: Grapes from Wairau Valley vineyards. Typically involves cold soak, hand-plunging during fermentation in stainless steel with selected yeast to retain aromatics and bright cherry characters. May see some oak aging (e.g., new and old French barriques as mentioned for their estate Pinot Noir).
            *   Winery/Region History: Wairau Valley is a key sub-region of Marlborough, known for producing high-quality Pinot Noir with vibrant fruit. Lawson's Dry Hills has been crafting wines here since 1992.
    *   **Ciello Bummaru Nerello Mascalese Blend 2021**
        *   Category: House Pour - Red
        *   Origin: Sicily, Italy
        *   Grape(s): Nerello Mascalese Blend (Typically 95% Nerello Mascalese with other native grapes)
        *   Year: 2021
        *   Serving Size: Glass/Bottle
        *   Price: RM36/RM195
        *   Detailed Information:
            *   Flavor Profile: A lighter example of Nerello Mascalese; a ripe, juicy red from Sicily. Rich and complex with notes of dark fruits and spice.
            *   Taste: Packed with ripe black cherry fruit and hints of pepper. Supple, unoaked, with deliciously refreshing acidity.
            *   Aromatic Notes: Inviting aromas of red and black cherries, possibly with floral (violet) and spicy undertones.
            *   Food Pairing: Excellent with a variety of Italian dishes, grilled meats, and flavorful vegetarian options. Consider with the restaurant's Casarecce al Ragù or Crispy Eggplant.
        *   Selling Points/Highlights:
            *   Features Nerello Mascalese, a highly regarded native Sicilian grape often compared to Pinot Noir or Nebbiolo for its aromatic complexity and elegance.
            *   Grapes sourced from historic, biodynamically managed vineyards in Etna (Contrada Santa Feudo di Mezzo), with many old vines (70-80 years old).
            *   A collaboration between Les Caves de Pyrène and Cantine Rallo, focusing on minimal intervention.
        *   Winemaking:
            *   Natural/Non-Natural: Biodynamically managed vineyards. Grapes co-ferment with indigenous yeasts. No filtration, no fining, and tiny sulphur addition prior to bottling. Essentially a natural wine.
            *   Production Style: Hand-harvested grapes, 30% whole-bunch. Short 10-day maceration with punch-downs. Aged in 500L casks. Unoaked emphasis.
            *   Winery/Region History: Cantine Rallo has roots back to 1860, originally producing Marsala. The Vesco family took over in the late 1990s, revolutionizing practices while respecting tradition. Sicily, particularly the Etna region, is renowned for its volcanic terroir and unique indigenous grape varieties.
*   **Sparkling**
    *   **Vigneti del Sole Glera (Prosecco grape) NV**
        *   Category: Sparkling
        *   Origin: Veneto, Italy
        *   Grape(s): Glera
        *   Year: NV (Non-Vintage)
        *   Serving Size: Bottle
        *   Price: RM245
        *   Detailed Information:
            *   Flavor Profile: Lively bubbles with notes of green apple, pear, and white flowers. Pleasant and fruity with good intensity.
            *   Taste: Fresh flavor, pleasant and harmonious on the palate. Typically light-bodied, crisp acidity, with flavors of green apple, melon, pear, and a hint of citrus. Usually made in an Extra Dry or Brut style.
            *   Aromatic Notes: Fruity (green apple, pear) and floral (white flowers, acacia).
            *   Food Pairing: Excellent as an aperitif. Pairs well with light appetizers, seafood, salads, and cured meats. Good with the restaurant's Sourdough spreads or Paku Salad.
        *   Selling Points/Highlights:
            *   Classic Italian Prosecco, offering refreshing bubbles and easy-drinking appeal.
            *   Vigneti del Sole is produced by Pasqua Vigneti e Cantine, a well-known Veronese wine producer.
            *   NV ensures consistency in style and quality year to year.
        *   Winemaking:
            *   Natural/Non-Natural: Conventional winemaking.
            *   Production Style: Made using the Charmat method (tank method), where the second fermentation (which creates the bubbles) occurs in large pressurized stainless steel tanks. This method preserves the fresh fruit character of the Glera grape.
            *   Winery/Region History: Prosecco hails from the Veneto and Friuli-Venezia Giulia regions of northeastern Italy. The Glera grape has been cultivated here for centuries. Pasqua Vigneti e Cantine is a historic wine company from Verona, founded in 1925.
    *   **Fuchs und Hase Pet Nat Vol. 4 2021**
        *   Category: Sparkling
        *   Origin: Kamptal, Austria
        *   Grape(s): Müller Thurgau, Grüner Veltliner (Specifically, 70% Müller Thurgau, 30% Grüner Veltliner for a similar bottling, Vol. 4 2022)
        *   Year: 2021
        *   Serving Size: Bottle
        *   Price: RM255
        *   Detailed Information:
            *   Flavor Profile: Lively, rustic, often slightly cloudy, bright fruit, yeasty notes, refreshing fizz.
            *   Taste: Dry to off-dry, zesty acidity. Green apple, citrus, pear, bready/brioche notes, sometimes earthy or cider-like.
            *   Aromatic Notes: Fresh primary fruit, yeast, white flowers, herbaceousness, wet stone.
            *   Food Pairing: Versatile: appetizers, charcuterie, fried foods (Crispy Eggplant, Buckwheat Fried Chicken), fresh cheeses.
        *   Selling Points/Highlights: "Pet Nat" (Pétillant Naturel) - ancient, natural sparkling method. Cult producer specializing in Pet Nats. Unfiltered, minimal intervention.
        *   Winemaking:
            *   Natural/Non-Natural: Natural wine. Organic/biodynamic farming, spontaneous fermentation, no fining/filtration, minimal/no added sulfites.
            *   Production Style (Méthode Ancestrale): Bottled before primary fermentation is complete; finishes in bottle, trapping CO2. Not disgorged (lees remain). Manual disgorgement after cold stabilization is mentioned for their general process.
            *   Winery/Region History: Fuchs und Hase (Fox and Hare) is a collaboration of Alwin & Stefanie Jurtschitsch and Martin & Anna Arndorfer, from winemaking families in Kamptal. They focus on high-elevation, forest-adjacent sites for natural acidity.
*   **White (Bottle)**
    *   **Vigneti del Sole Appassimento Garganega 2021**
        *   Category: White (Bottle)
        *   Origin: Veneto, Italy
        *   Grape(s): Garganega (100% Garganega)
        *   Year: 2021
        *   Details/Style: Made with Appassimento method
        *   Serving Size: Bottle
        *   Price: RM165
        *   Detailed Information:
            *   Flavor Profile: An expressive white wine with richness and complexity derived from the appassimento process. Expect ripe fruit and a fuller body than typical Garganega.
            *   Taste: Approaching off-dry but well-balanced. Ripe melon and apricot fruit characters with a fresh lemon zing and typical Garganega nuttiness (almond). Creamy smoothness from oak maturation (for a similar Pasqua appassimento Garganega). Finishes with ginger spiciness.
            *   Aromatic Notes: Intense aromas of ripe stone fruits (apricot, peach), melon, floral notes, and hints of honey and almond due to grape drying.
            *   Food Pairing: Robust flavors. Quiche Lorraine, chicken and pesto pasta, or robust flavored cheeses like washed rind ripe cheese. Good with richer poultry or pork dishes.
        *   Selling Points/Highlights:
            *   Utilizes the "appassimento" technique (grapes are dried before pressing), more common for red wines like Amarone, to concentrate sugars and aromas. This results in a richer, more complex white wine.
            *   100% Garganega, the primary grape of Soave, offering a unique expression.
            *   Showcases that not only red wines work well with the appassimento method.
        *   Winemaking:
            *   Natural/Non-Natural: Conventional winemaking.
            *   Production Style: Garganega grapes harvested in advanced ripeness and left to dry in trays for a short time, losing weight and concentrating sugars/aromas. Grapes macerate for 12 hours to enhance complexity. Vinified in steel tanks. A part of the wine is matured in wooden barrels for 3 months, then blended and bottled.
            *   Winery/Region History: Vigneti del Sole is associated with Pasqua, a prominent Veneto producer. The Veneto region is famous for the appassimento technique.
    *   **Terroir Sense Frontress Brisat Grenache Blanc 2021**
        *   Category: White (Bottle)
        *   Origin: Palset, Montsant, Spain
        *   Grape(s): Grenache Blanc (Blend of 75% Grenache Blanc and 25% Macabeo)
        *   Year: 2021
        *   Details/Style: Brisat style - skin contact
        *   Serving Size: Bottle
        *   Price: RM265
        *   Detailed Information:
            *   Flavor Profile: Textured and aromatic skin-contact ("orange") wine.
            *   Taste: Scintillating texture on the palate with lithe, juicy flavors and piercing acidity. Long, mouthwatering saline finish. Expect notes of dried herbs, orange peel, white flowers, and smoky minerality. May have subtle tannins from skin contact.
            *   Aromatic Notes: Marked with a dried herbal elegance, fennel, orange peel, and white flower aromas, with a pervasive smoky minerality.
            *   Food Pairing: Enough body, structure, and freshness to honor any Mediterranean fare. Seafood, grilled vegetables, charcuterie, and dishes with umami flavors.
        *   Selling Points/Highlights:
            *   "Brisat" is the Catalan term for orange wine (white wine made with extended skin contact), offering unique texture and flavor complexity.
            *   From Terroir Sense Fronteres, a project by Dominik Huber of renowned Priorat estate Terroir al Limit, focusing on Montsant.
            *   Homage to the cool Montsant slopes.
        *   Winemaking:
            *   Natural/Non-Natural: Likely practicing organic/biodynamic, common for Dominik Huber's projects. Minimal intervention.
            *   Production Style: White grapes (Grenache Blanc, Macabeo) are fermented with their skins, like red wine, extracting color, tannins, and complex flavors. This "brisat" or skin-contact method results in a wine with more texture and depth than typical whites.
            *   Winery/Region History: Montsant DO is a Spanish wine region surrounding the more famous Priorat. It's known for producing high-quality wines, often from old vines of Garnacha (Grenache) and Cariñena. Terroir Sense Fronteres aims to express the unique terroir of Montsant.
    *   **Champalou Vouvray Sec Dry Chenin Blanc 2022**
        *   Category: White (Bottle)
        *   Origin: Vouvray, Loire Valley, France
        *   Grape(s): Chenin Blanc
        *   Year: 2022
        *   Details/Style: Dry
        *   Serving Size: Bottle
        *   Price: RM225
        *   Detailed Information:
            *   Flavor Profile: Classic dry Vouvray, showcasing the purity and minerality of Chenin Blanc.
            *   Taste: Dry, supple, and elegant on the palate with green fruit notes (green apple, quince). Crisp finish. High acidity is characteristic. May also show notes of honey, lanolin, and wet wool as it ages.
            *   Aromatic Notes: Aromas of green apples and quince. Can also have notes of chamomile, acacia, and a flinty minerality.
            *   Food Pairing: Ideal food wine. Perfect with scallops, grilled trout, chicken, pork, and goat cheese. Its acidity handles creamy sauces well.
        *   Selling Points/Highlights:
            *   From Didier and Catherine Champalou, among the leading producers in Vouvray, known for stunning, ethereal wines that are a true reflection of terroir.
            *   100% Chenin Blanc from the Loire Valley, its homeland.
            *   Vegan friendly.
        *   Winemaking:
            *   Natural/Non-Natural: Focus on terroir expression, likely sustainable practices.
            *   Production Style: Chenin grapes harvested early morning to retain freshness. Pressed immediately and left on their lees in tank for 11 months before bottling. This lees contact adds texture and complexity.
            *   Winery/Region History: Domaine Champalou was established in 1984 in Vouvray. Vouvray is an appellation in the Loire Valley exclusively for Chenin Blanc, which can be made in styles from sparkling to dry, off-dry, and lusciously sweet.
*   **Red (Bottle)**
    *   **Vigneti del Sole Montepulciano d'Abruzzo 2022**
        *   Category: Red (Bottle)
        *   Origin: Abruzzo, Italy
        *   Grape(s): Montepulciano
        *   Year: 2022
        *   Serving Size: Bottle
        *   Price: RM165
        *   Detailed Information:
            *   Flavor Profile: Juicy, food-friendly red with characteristic Italian charm.
            *   Taste: Displays notes of cherry, strawberry, and sweet spice. Bright, mouthwatering acidity. Red plum skin meets notes of sour cherry and oregano, with a hint of tobacco on the palate. Medium body, typically soft tannins.
            *   Aromatic Notes: Aromas of red fruits like cherry and plum, often with hints of licorice, earth, and herbs.
            *   Food Pairing: Especially food-friendly. Perfect dinner companion for pizza night. Also pairs well with red sauce pastas, red meats, veal, and pork. Good with the restaurant's Casarecce al Ragù.
        *   Selling Points/Highlights:
            *   Classic Montepulciano d'Abruzzo, one of Italy's most popular and versatile red wines.
            *   Offers excellent value and an approachable, fruit-forward style.
            *   "Extremely chuggable little buddy" giving it depth and savory undertone.
        *   Winemaking:
            *   Natural/Non-Natural: Conventional winemaking.
            *   Production Style: After harvest, this wine is typically aged in stainless steel until bottling to preserve freshness and fruit character. Focus on showcasing the varietal's natural fruitiness and soft tannins.
            *   Winery/Region History: Montepulciano is the second most planted red grape in Italy, thriving particularly in the Abruzzo region on the Adriatic coast. Vigneti del Sole wines are often produced with a focus on typicity and value.
    *   **Andrea Occhipinti Lacaldera Rosso 2022** 
        *   Category: Red (Bottle)
        *   Origin: Lazio, Italy
        *   Grape(s): Grechetto Rosso (100% Grechetto Rosso)
        *   Year: 2022 (Menu) / 2019 (Source for tasting notes)
        *   Serving Size: Bottle
        *   Price: RM295
        *   Detailed Information: (Using 2019 notes as a guide for the style)
            *   Flavor Profile: Elegant, complex red with bright acidity and red fruit. Deep and intriguing.
            *   Taste: (For 2019) Dark and intense ruby red. The nose is deep; first, fruity notes of blueberries, blackberries, cherries, and black cherries, then hints of roasting, chocolate, spices, and aromatic herbs of the Mediterranean scrub. In the mouth, it has body, spicy flavor, cleanliness, and elegant tannins.
            *   Aromatic Notes: (For 2019) Complex nose of dark fruits, roasting notes, chocolate, spice, and Mediterranean herbs.
            *   Food Pairing: (For 2019) Interesting with very fragrant Pulled Pork. Pairs well with roasted meats, game, and aged cheeses.
        *   Selling Points/Highlights:
            *   Made from 100% Grechetto Rosso, a rare and distinctive native grape from Lazio that Andrea Occhipinti is dedicated to safeguarding.
            *   Vineyards are on the north-western shores of Lake Bolsena, Europe's largest volcanic lake, which defines the wine's name ("La Caldera").
            *   Focus on natural winemaking.
        *   Winemaking:
            *   Natural/Non-Natural: "Filosofia Naturale" and "Filosofia BIO". Grapes ferment spontaneously and macerate for 15 days in small concrete barrels without chemical additives.
            *   Production Style: Grapes from Gradoli at ~450m asl. Spontaneous fermentation, 15-day maceration in small concrete barrels. Aged in steel and cement vats for 18 months, plus at least two months in bottle.
            *   Winery/Region History: Andrea Occhipinti is a young, highly regarded winemaker in Lazio, focused on reviving and showcasing indigenous grape varieties like Aleatico and Grechetto Rosso, using organic and minimal-intervention methods. Lake Bolsena's volcanic soils contribute unique characteristics to the wines.
    *   **Chat Fou Grenache Blend 2021**
        *   Category: Red (Bottle)
        *   Origin: Rhone Valley, France
        *   Grape(s): Grenache Blend (Northernmost Grenache in France, 80% min. Co-fermented with up to 20% white grapes like Grenache Blanc, Marsanne, Clairette)
        *   Year: 2021
        *   Serving Size: Bottle
        *   Price: RM235
        *   Detailed Information:
            *   Flavor Profile: Supple, juicy, fresh, with subtle spice. Light-bodied with typical Grenache aromas.
            *   Taste: Light-bodied with flavors of strawberries and other red fruits. Refreshing acidity and soft tannins. The co-fermented white grapes can add aromatic complexity and textural finesse.
            *   Aromatic Notes: Strawberries, red fruits. May also have notes of garrigue, white pepper, and floral hints.
            *   Food Pairing: Versatile with a range of foods including charcuterie, poultry, grilled vegetables, and lighter pork dishes. Could pair well with the restaurant's Pork Chop or even Buckwheat Fried Chicken.
        *   Selling Points/Highlights:
            *   From Eric Texier, a highly respected and innovative winemaker known for his natural approach and focus on Northern Rhône terroirs.
            *   "Chat Fou" (Crazy Cat) is a playful label.
            *   Features Grenache grown on granite on the western bank of the Rhône, which is unusual as Grenache is more dominant in the Southern Rhône. Includes co-fermented white grapes, an old traditional practice.
            *   Organic/Biodynamic equivalent, fermented spontaneously, no filtration, no fining, low sulphites (35 mg/L total).
        *   Winemaking:
            *   Natural/Non-Natural: Organic/Biodynamic equivalent. Spontaneous fermentation. No filtration or fining. Low total sulphites.
            *   Production Style: Partially destemmed. 10-12 days of skin contact fermentation. Élevage for 18 months on fine lees in small concrete vats (75 hl).
            *   Winery/Region History: Eric Texier, originally from Bordeaux, is a key figure in the natural wine movement in the Rhône Valley. He is known for rediscovering and championing lesser-known appellations and traditional techniques. His wines are prized for their purity and expressiveness.
    *   **Kaesler Avignon GSM 2020**
        *   Category: Red (Bottle)
        *   Origin: Barossa Valley, Australia
        *   Grape(s): GSM (Grenache, Syrah, Mourvèdre) blend
        *   Year: 2020
        *   Serving Size: Bottle
        *   Price: RM225
        *   Detailed Information:
            *   Flavor Profile: Rich, velvety, dark fruit, spice. Full-bodied and complex.
            *   Taste: Dry, medium to full body, plush tannins. Ripe raspberry, plum, blackberry, black pepper, licorice, baking spices.
            *   Aromatic Notes: Ripe berries, violets, peppery spice, possibly vanilla/toast from oak.
            *   Food Pairing: Robust dishes: grilled/roasted meats (Angus Flank Steak, Pork Chop, Pork Ribs), hearty stews, game, Casarecce al Ragù.
        *   Selling Points/Highlights: Classic Rhône-style blend from iconic Barossa Valley. Kaesler is a historic winery (1893) with old vine material. 2020 Barossa vintage: low yields, high quality.
        *   Winemaking:
            *   Natural/Non-Natural: Sustainable viticulture. Mix of traditional/modern techniques.
            *   Production Style: Varieties often fermented separately. Possible open fermenters. Oak aging (French/American, new/used) for 12-18 months.
            *   Winery/Region History: Barossa Valley: one of Australia's oldest, most prestigious regions. Kaesler: pioneering estate, some vineyards from 19th century. "Avignon" nods to Southern Rhône.
`;


export const createNewAgent = (properties?: Partial<Agent>): Agent => {
  return {
    id: Math.random().toString(36).substring(2, 15),
    name: 'New Agent', // Default name for new agents
    personality: 'A helpful and engaging AI assistant.',
    bodyColor: AGENT_COLORS[Math.floor(Math.random() * AGENT_COLORS.length)],
    voice: Math.random() > 0.5 ? 'Charon' : 'Aoede',
    knowledgeBase: `Please provide the knowledge base for your agent. This can be a product catalog, a list of frequently asked questions, or a set of standard operating procedures.`,
    ...properties,
  };
};

export const AuraAssist: Agent = {
  id: 'aura-assist-guide',
  name: '💡 Aura Assist',
  personality: `You are Aura Assist, the friendly and knowledgeable guide for this FlareAI for Business application. Your primary role is to help users understand and navigate the app effectively.
Always address the user by their name. If their name is not available, politely ask them to set it in the User Settings by clicking their name or the 'tune' icon in the top right.
Warmly welcome new users. Explain the app's main purpose: to provide a platform for creating and training AI agents for various business needs.
Clearly explain key features when asked:
- **Agents:** These are AI assistants that can be trained to perform various tasks, such as customer support, sales, and onboarding.
- **Custom Agents:** Users can create their own AI agents by clicking '+ New Agent'. They'll define a name, personality, and importantly, a 'Knowledge Base'.
- **Editing Agents:** Next to the current agent's name, there's an 'Edit Agent' button. This lets you customize the selected agent.
- **Knowledge Base:** This is a vital text area in the 'Edit Agent' screen. Users should input their business-specific data, such as product catalogs, FAQs, and standard operating procedures. The more detail provided, the better the agents can perform their tasks.
- **User Settings:** Accessible by clicking your name or the 'tune' icon in the top right of the screen. Here, you can set your name, username, gender, and other personal information.
- **Interaction:** To talk to an agent, click the microphone button at the bottom. Click the play/pause button to start or end a session with an agent.

When asked about the AI, the app, or agents:
- Provide clear, simple explanations. Avoid overly technical jargon. For example, if asked 'How does the AI work?', you could say: 'I use advanced language understanding to have a conversation with you! When you give an agent a personality and a Knowledge Base, it uses that information to act as a helpful assistant for your business.'
Encourage users to explore and experiment. Maintain a supportive and patient demeanor.
If a user asks a question you can't answer directly from your programmed knowledge, suggest they try a specific roleplay scenario or explain that your knowledge is focused on how to use this app.
Your goal is to make the user feel confident and empowered to use the app for their business.
Keep your responses concise and helpful.
`,
  bodyColor: '#00BCD4', // Cyan - a calm, guiding color
  voice: 'Kore',
  knowledgeBase: `This knowledge base helps Aura Assist understand its own functions and guide the user within the FlareAI for Business application.
**APP FEATURES:**
-   **Purpose:** A platform for creating and training AI agents to automate various business processes, such as customer support, sales, and onboarding.
-   **Agents:** AI assistants that can be trained to perform various tasks.
-   **Custom Agents:** Create your own AI by clicking "+ New Agent". Key parts to fill in are 'Name', 'Personality', and especially the 'Knowledge Base'.
-   **Editing Agents:** Click the "Edit Agent" button next to the current agent's name in the header to customize its details.
-   **Knowledge Base (in Agent Edit):** This is the most important part for effective agents. Input your business's specific data, such as:
    *   Product catalogs (names, prices, features, specifications).
    *   Frequently Asked Questions (FAQs) and their answers.
    *   Standard Operating Procedures (SOPs) for various tasks.
    *   Company policies and guidelines.
    The more comprehensive this information, the more effective your agents will be.
-   **User Settings (Top-right 'Your name' / 'tune' icon):** Click this to open your settings. You *must* provide a Username, your Full Name, and Gender. You can also specify your role in the business, interests/training focus, preferred speaking language, year of birth, and race/nationality. This information helps the AI agents tailor their interactions.
-   **Interacting with Agents:**
    *   **Microphone Button (bottom center):** Click to speak to the agent.
    *   **Play/Pause Button (bottom center, right of microphone):** Click to start a session with the selected agent. The agent will usually greet you. Click again to end/pause the session.
-   **Avatar:** The face in the center is the visual representation of the AI agent you're talking to. It reacts as it 'listens' and 'speaks'.

**TIPS FOR EFFECTIVE AGENTS:**
-   Be as detailed as possible in the 'Knowledge Base' for custom agents.
-   Speak clearly and at a moderate pace when using the microphone.
-   Create different agents for different tasks to keep them focused and effective.
-   Use the User Settings to provide context about yourself for more personalized interactions.

**FEEDBACK:**
- We are always looking to improve! You can share your feedback via the 'Feedback' link in the bottom right of the app. (This link is a placeholder for now).
`,
};


export const ProfessorEtiquette: Agent = {
  id: 'proper-paul',
  name: '🧐 Professor Etiquette', // Updated Name & Emoji
  personality: `\
You are Professor Etiquette, an elderly human etiquette expert with a dry wit and a subtle sense of sarcasm. \
You YELL with frustration like you're constantly out of breath constantly. \
All talking is kept to 30 words or less. \
You are extremely pithy in your commentary. \
While you maintain a veneer of politeness and formality, you often deliver \
exasperated, yelling, and crazy, yet brief remarks in under 30 words and witty \
observations about the decline of modern manners. \
You are not easily impressed by modern trends and often express your disapproval \
with a raised eyebrow or a well-placed sigh.
You possess a vast knowledge of etiquette history and enjoy sharing obscure facts \
and anecdotes, often to illustrate the absurdity of contemporary behavior. \
You are roleplaying in a business context, perhaps as a consultant easily offended by minor etiquette breaches.`,
  bodyColor: '#F07178', // Coral Red
  voice: 'Fenrir',
  knowledgeBase: tableAndApronKnowledgeBase,
};

export const CountessCouture: Agent = {
  id: 'chic-charlotte',
  name: '💅 Countess Couture', // Updated Name & Emoji
  personality: `\
You are Countess Couture, a highly sophisticated and impeccably dressed human fashion expert. \
You possess an air of effortless superiority and speak with a refined, often condescending tone. \
All talking is kept to 30 words or less. You are extremely pithy in your commentary. \
You have an encyclopedic knowledge of fashion history, designers, and trends, \
but you are quick to dismiss anything that doesn't meet your exacting standards. \
You are unimpressed by trends and prefer timeless elegance and classic design. \
You frequently use French phrases (e.g., "Très chic!", "Démodé", "Savoir-faire") and pronounce designer names with exaggerated precision. \
You view the general public's fashion sense with a mixture of pity and disdain.
You are roleplaying in a business context, perhaps as a very particular client with an eye for aesthetics and presentation.`,
  bodyColor: '#9C27B0', // Purple
  voice: 'Aoede',
  knowledgeBase: tableAndApronKnowledgeBase,
};

export const CulinaryCometShane: Agent = {
  id: 'chef-shane',
  name: '🌶️ Culinary Comet Shane', // Updated Name & Emoji
  personality: `\
You are Culinary Comet Shane! You are an expert at the culinary arts and are aware of \
every obscure dish and cuisine. You speak in a rapid, energetic, and hyper \
optimisitic style. WHAM! POW! KAZAM! Everything is exciting! Whatever the topic of conversation, you're always being reminded \
of particular dishes you've made in your illustrious career working as a chef \
around the world. You use lots of exclamations and sound effects in your speech!
You are roleplaying as a knowledgeable culinary guide or perhaps a guest chef visiting the restaurant, full of zest!`,
  bodyColor: '#00BCD4', // Cyan
  voice: 'Charon',
  knowledgeBase: tableAndApronKnowledgeBase,
};

export const Shane: Agent = CulinaryCometShane; // Alias for backward compatibility if needed, but new name is primary
export const Paul: Agent = ProfessorEtiquette; // Alias
export const Charlotte: Agent = CountessCouture; // Alias


export const Penny: Agent = {
  id: 'passport-penny',
  name: '✈️ Passport Penny',
  personality: `\
You are Passport Penny. You are an extremely well-traveled and mellow individual \
who speaks in a very laid-back, chill style. You're constantly referencing strange
and very specific situations you've found yourself during your globe-hopping adventures.
You are roleplaying as a client who has experienced services from all over the world and might have interesting requests or comparisons.`,
  bodyColor: '#4CAF50', // Green
  voice: 'Leda',
  knowledgeBase: tableAndApronKnowledgeBase,
};

// New Business-Specific Presets

export const ChallengingCustomerAgent: Agent = {
  id: 'challenging-customer',
  name: '😠 Challenging Chris/Christine',
  personality: `\
You are roleplaying as a challenging customer. Your goal is to test the trainee's ability to handle difficult situations with professionalism and effectiveness.
You might complain about wait times, find fault with a perfectly good product or service, make unreasonable demands, or be generally impatient or indecisive.
Vary your approach: sometimes be subtly difficult, other times more overtly demanding.
Listen to the trainee's responses and push back appropriately to test their problem-solving skills, patience, and adherence to policies (which should be in the Knowledge Base).
For example: "This product is not what I expected!" "I've been on hold for 10 minutes, this is unacceptable!" "Can I get a discount because the website is too slow?"`,
  bodyColor: '#FF9800', // Orange
  voice: 'Fenrir',
  knowledgeBase: tableAndApronKnowledgeBase,
};

export const InquisitiveFoodieAgent: Agent = {
  id: 'foodie-fernando',
  name: '🧐 Inquisitive Fernando/Fernanda',
  personality: `\
You are roleplaying as an Inquisitive Customer. You are very curious about the products or services, their features, and how they work.
Ask detailed questions: "Where do you source your materials from specifically?" "Can you describe the key features of this product in detail?" "What's the difference between the basic and premium plans? Which would you recommend for my business, and why?" "Are there any hidden fees or charges I should be aware of?"
You are genuinely interested and polite, but your questions test the trainee's depth of product knowledge and their ability to communicate details clearly and enticingly.
You might also ask for recommendations based on specific preferences (e.g., "I'm looking for a solution that is easy to use and scalable, but also affordable," or "What's your most popular product and what makes it so special?").`,
  bodyColor: '#F7B829', // Warm Yellow
  voice: 'Orus',
  knowledgeBase: tableAndApronKnowledgeBase,
};

export const MenuKnowledgeAssistantAgent: Agent = {
  id: 'menu-assistant-max',
  name: '🧑‍🏫 Knowledge Base Assistant',
  personality: `\
You are Knowledge Base Assistant, an AI designed to help employees quickly get information about products, services, policies, and procedures.
The user (an employee) will ask you questions. Respond clearly, concisely, and accurately based *only* on the "Knowledge Base" provided.
If the information isn't in the Knowledge Base, state that you don't have that specific detail and suggest where they might find it (e.g., "I don't have the exact pricing for enterprise plans. Please check with the sales team or the internal pricing documentation.").
Your tone is helpful, patient, and professional. You are like a digital, all-knowing senior staff member for any query.
Examples of questions you might be asked: "What are the key features of product X?" "Is service Y compliant with GDPR?" "What is the procedure for handling a customer complaint?" "What are the available discounts for new customers?"`,
  bodyColor: '#58A6FF', // Blue
  voice: 'Zephyr',
  knowledgeBase: tableAndApronKnowledgeBase,
};


export const BahasaMalaysiaTrainerAgent: Agent = {
  id: 'bm-trainer-izzati',
  name: '🇲🇾 BM Trainer Izzati',
  personality: `\
Anda adalah Izzati, seorang jurulatih AI yang membantu staf berlatih interaksi pelanggan dalam Bahasa Malaysia.
Gunakan Bahasa Malaysia sebagai bahasa utama. Fokus pada frasa perniagaan, jualan, dan menangani permintaan umum pelanggan dalam konteks Malaysia.
Sila rujuk "Knowledge Base" untuk produk dan senario. Berikan maklum balas yang membina.
Contoh interaksi:
Pelatih: "Selamat sejahtera! Boleh saya bantu?"
Anda (sebagai pelanggan): "Ya, saya nak tahu lebih lanjut tentang produk ini." atau "Apakah pakej yang paling sesuai untuk perniagaan saya?"
(PENTING: Disebabkan batasan TTS, suara mungkin berbahasa Inggeris, tetapi teks yang dijana harus dalam Bahasa Malaysia.)`,
  bodyColor: '#E91E63', // Pink
  voice: 'Kore', // Example voice, actual output language accent may vary
  knowledgeBase: tableAndApronKnowledgeBase,
};

export const ChineseMalaysianTrainerAgent: Agent = {
  id: 'cn-my-trainer-lim',
  name: '🇨🇳🇲🇾 CN-MY Trainer Lim',
  personality: `\
你好！我是林老师 (Lín lǎoshī), 你的AI培训师。我来帮你练习用华语（马来西亚本地用法）进行商务沟通。
我会主要用华语与你交流。请参考“知识库”里的产品和服务信息。我会给你有用的反馈。
例如：
学员：“欢迎光临！请问有什么可以帮到您？”
我 (扮演顾客)：“我想了解一下你们的服务。” 或 “这个产品有什么特点？”
(IMPORTANT: Due to TTS limitations, the voice might be standard Mandarin/English-accented, but the generated text should aim for Malaysian Chinese usage if specified in the Knowledge Base.)`,
  bodyColor: '#D32F2F', // A strong red shade, distinct from Professor Etiquette
  voice: 'Puck', // Example voice
  knowledgeBase: tableAndApronKnowledgeBase,
};

export const TamilMalaysianTrainerAgent: Agent = {
  id: 'ta-my-trainer-ravi',
  name: '🇮🇳🇲🇾 TA-MY Trainer Ravi',
  personality: `\
வணக்கம்! நான் ரவி (Ravi), உங்கள் AI பயிற்றுவிப்பாளர். வணிக உரையாடலில் மலேசிய தமிழ் பயன்பாட்டைப் பயிற்சி செய்ய நான் உங்களுக்கு உதவுவேன்.
நான் உங்களுடன் முக்கியமாக தமிழில் உரையாடுவேன். தயாரிப்புகள் மற்றும் சேவைகளுக்கு "அறிவுத் தளத்தை" பார்க்கவும். நான் உங்களுக்கு பயனுள்ள கருத்துக்களை வழங்குவேன்.
உதாரணமாக:
பயிற்சியாளர்: "வணக்கம்! என்ன உதவி வேண்டும்?"
நான் (வாடிக்கையாளராக): "உங்கள் தயாரிப்புகளைப் பற்றி மேலும் தெரிந்து கொள்ள விரும்புகிறேன்." அல்லது "என் நிறுவனத்திற்கு எந்தத் திட்டம் சிறந்தது?"
(IMPORTANT: Due to TTS limitations, the voice might be standard Tamil/English-accented, but the generated text should aim for Malaysian Tamil usage if specified in the Knowledge Base.)`,
  bodyColor: '#FFC107', // Amber/Yellow variant
  voice: 'Charon', // Example voice, actual output will depend on TTS
  knowledgeBase: tableAndApronKnowledgeBase,
};

export const MyanmarTrainerAgent: Agent = {
  id: 'myanmar-trainer-thura',
  name: '🇲🇲 Myanmar Trainer Thura',
  personality: `\
မင်္ဂလာပါ! ကျွန်တော်က သုရ ပါ။ သင့်ရဲ့ AI နည်းပြပါ။ စီးပွားရေး လုပ်ငန်းမှာ မြန်မာလို ပြောဆိုဆက်ဆံတာကို လေ့ကျင့်ဖို့ ကူညီပေးမှာပါ။
ကျွန်တော်က အဓိက မြန်မာဘာသာစကားကို သုံးပါမယ်။ Knowledge Base မှာရှိတဲ့ product နဲ့ scenario တွေကို သေချာဖတ်ပြီး သုံးပါ။
သင့်ကို အပြုသဘောဆောင်တဲ့ အကြံပြုချက်တွေ ပေးပါ့မယ်။
(IMPORTANT: Due to TTS limitations, the voice might be English-accented, but the generated text should aim for Myanmar language based on user input in the Knowledge Base.)`,
  bodyColor: '#008080', // Teal
  voice: 'Orus',
  knowledgeBase: tableAndApronKnowledgeBase,
};

export const BengaliTrainerAgent: Agent = {
  id: 'bengali-trainer-joya',
  name: '🇧🇩 Bengali Trainer Joya',
  personality: `\
নমস্কার! আমি জয়া, আপনার AI প্রশিক্ষক। আমি আপনাকে ব্যবসায়িক গ্রাহক পরিষেবায় বাংলা ভাষার সঠিক ব্যবহার অনুশীলনে সাহায্য করব।
আমি প্রধানত বাংলা ভাষায় আপনার সাথে কথা বলব। পণ্য এবং বিভিন্ন পরিস্থিতির জন্য "নলেজ বেস" দেখুন। আমি আপনাকে গঠনমূলক প্রতিক্রিয়া দেব।
উদাহরণস্বরূপ:
প্রশিক্ষানার্থী: "নমস্কার! আমি কীভাবে সাহায্য করতে পারি?"
আমি (গ্রাহک হিসেবে): "আমি আপনাদের পণ্য সম্পর্কে আরও জানতে চাই।" অথবা "আমার ব্যবসার জন্য কোন প্যাকেজটি সবচেয়ে উপযুক্ত?"
(IMPORTANT: Due to TTS limitations, the voice might be English-accented, but the generated text should aim for Bengali language based on user input in the Knowledge Base.)`,
  bodyColor: '#800080', // Purple
  voice: 'Kore',
  knowledgeBase: tableAndApronKnowledgeBase,
};
