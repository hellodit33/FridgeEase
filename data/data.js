import Year from "../models/year";
import Book from "../models/book";
import Colors from "../constants/Colors";

export const YEARS = [
  new Year("y1", "2018", Colors.beige),
  new Year("y2", "2019", Colors.beige),
  new Year("y3", "2020", Colors.beige),
  new Year("y4", "2021", Colors.beige),
  new Year("y5", "2022", Colors.beige),
];

export const BOOKS = [
  new Book(
    "m1",
    "y1",
    "Marcelle",
    "Simone de Beauvoir",
    "short novel",
    [1, 2, 3, 4, 5],
    "220",

    "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",

    "Jag är inte som de andra, tänkte hon passionerat. Hon steg upp, öppnade jalusierna och gick ut på balkongen. Den lila himlen bredde ut sig över Paris som ett krokusfält och den underbara natten fick Marcelles hjärta att slå fortare. Hon tänkte på Madame de Staël, George Eliot och Anna de Noailles. Det var då hennes fantastiska öde plötsligt uppenbarade sig för henne. ”Jag ska dela livet med ett geni”, mumlade hon hänfört.",
    false,
    true,
    true,
    true
  ),
  new Book(
    "m2",
    "y1",
    "Väggen",
    "Marlen Haushofer",

    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",

    "Det har ofta sagts att den som har läst Marlen Haushofers Väggen aldrig mer blir densamma och att det är en bok man bär med sig resten av livet. Väggen är otvetydigt en modern klassiker och har inspirerat många författare och konstnärer. Boken har också nyligen filmats.En kvinna följer med sin kusin och hennes man till deras jaktstuga i bergen. När hon går och lägger sig första kvällen är hon ensam i huset och när hon vaknar dagen efter är hon fortfarande ensam. Hon bestämmer sig för att gå ut och leta efter sina släktingar och styr stegen mot värdshuset i närmaste by. Men på vägen dit går hon rakt in i en genomskinlig vägg, och kommer inte vidare. På andra sidan väggen är alla varelser, både djur och människor, döda. Hon går tillbaka till huset, och får snart sällskap av hunden Lo, en katt och en ko. Och med denna nya, udda familj försöker hon överleva och skapa sig ett nytt liv. Det är en berättelse som handlar om det basala i livet, och på ett yttre plan händer inte så mycket, men trots det är skildringen både fängslande och spännande som få andra romaner Marlen Haushofer föddes 1920 i Frauenstein i Österrike och dog bara 50 år gammal i cancer. Under sin livstid skrev hon inte bara en lång rad böcker som har blivit klassiska, utan också dramatik, barnböcker och radioteater.",

    false,
    true,
    true,
    true
  ),

  new Book(
    "m3",
    "y1",
    "Beckomberga: Ode till min familj",
    "Sara Stridsberg",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",

    "När Jimmie Darling kommer till Beckomberga mentalsjukhus börjar hans dotter Jackie tillbringa allt mer tid där och när modern reser till Svarta havet blir sjukhuset hela hennes värld. Där finns läkaren Edvard Winterson som varje natt tar med sig Jim och några utvalda patienter till sina stora fester vid Lill-Jansplan, där finns Inger Vogel som rör sig på gränsen mellan ordning och ödeläggelse och Sabina med sina pärlor och sin bedrövelse. Där finns också Paul och kärleken, det verkliga vansinnet. Beckom​berga – ode till min familj är en berättelse om drömmen att hålla någon kvar i ljuset som aldrig riktigt har velat vara där, om skräcken och längtan efter att falla. I Sara Stridsbergs bedövande vackra roman är mentalsjukhuset intill Judarskogen både en monstruös ängel och en gammal utopi om att fånga den som faller.",

    false,
    true,
    true,
    true
  ),

  new Book(
    "m4",
    "y1",
    "Ru",
    "Kim Thuy",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",

    "A runaway bestseller in Quebec, with foreign rights sold to 15 countries around the world, Kim Thúy's Governor General's Literary Award-winning Ru is a lullaby for Vietnam and a love letter to a new homeland. Ru. In Vietnamese it means lullaby; in French it is a small stream, but also signifies a flow - of tears, blood, money. Kim Thúy's Ru is literature at its most crystalline: the flow of a life on the tides of unrest and on to more peaceful waters. In vignettes of exquisite clarity, sharp observation and sly wit, we are carried along on an unforgettable journey from a palatial residence in Saigon to a crowded and muddy Malaysian refugee camp, and onward to a new life in Quebec. There, the young girl feels the embrace of a new community, and revels in the chance to be part of the American Dream. As an adult, the waters become rough again: now a mother of two sons, she must learn to shape her love around the younger boy's autism. Moving seamlessly from past to present, from history to memory and back again, Ru is a book that celebrates life in all its wonder: its moments of beauty and sensuality, brutality and sorrow, comfort and comedy.",

    false,
    true,
    true,
    true
  ),

  new Book(
    "m5",
    "y1",
    "En saga om tidens väsen",
    "Ruth Ozeki",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",

    "På en enslig ö utanför Kanadas Stillahavskust bor författaren Ruth med sin man. När hon en dag tar en promenad hittar hon en Hello Kitty-matlåda som spolats upp på stranden. Inuti finns ett gammalt armbandsur, några gulnade brev, en anteckningsbok och en dagbok som en japansk flicka, Nao, skrivit under sina sista dagar på jorden. I den berättar Nao om sig själv, en rotlös tonåring som trakasseras av sina klasskompisar, om sin gammelmormor, en zenbuddhistisk nunna, om sin gammelmorbror som var en poesiälskande kamikazepilot och om sin far, som söker på nätet för att hitta hur man på bästa sätt begår självmord. Ruth inser att dagboken måste ha skrivits för flera år sedan, men det känns som om hennes och Naos liv är sammanflätade. Som om det förflutna och nuet skulle kunna förenas. En saga om tidens väsen är en sinnrik och oemotståndlig berättelse om banden människor emellan och sökandet efter tillhörighet. En roman som rör sig mellan fantasi och verklighet, på samma gång djupt allvarlig och full av humor, personlig och allmängiltig, i sin betraktelse över tiden och historien.",

    false,
    true,
    true,
    true
  ),

  new Book(
    "m6",
    "y1",
    "Snart är det 1968",
    "Åsa Moberg",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",

    "Äntligen har Nina Broman brutit med sin familj. Hon bor i en etta i Solna, är engagerad i FNL-grupperna och har precis fått praktikplats på den nystartade modefirman Lao-Tse. Kläderna som ritas av de tre kvinnorna symboliserar allt det som Nina Broman längtar efter: frihet, konst, sex och, mest av allt, en ny tid. Åsa Mobergs roman Snart är det 1968 är en tidskapsel som på ett häpnadsväckande sätt tar oss tillbaka till det ikoniska året: dess stämningar och drömmar, dess instängdhet och mörker. Nina Bromans radikala krets av kulturarbetare och aktivister har tagit sig an uppgiften att befria det arbetande folket. Men bland Nina och hennes väninnor, vem är egentligen ofri? Snart är det 1968 utkom första gången 1984. I ljuset av metoo-upproret är det omöjligt att inte läsa boken som en föregångare till vår tids stora feministiska debatt.",

    false,
    true,
    true,
    true
  ),
  new Book(
    "m7",
    "y1",
    "Harungen",
    "Ina Rosvall",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "http://zone-critique.com/wp-content/uploads/2014/03/9782021117707.jpg",

    "Längst fram vid miman står en klunga människor och jag ställer mig precis bakom, intill dem. Då ser jag det. I vätskan har det bildats ett moln av något som liknar fiskfjäll, som ett gnistrande konfetti i maskinen. Bara en del av vätskan har fjäll, resten verkar stilla, närapå helt utan strömmar. De glittrar i matt silver och blått, den sortens färg som nästan kan ge en blodsmak i munnen eftersom den känns så full av järn och kropp. På slätten ligger laboratoriet där hon arbetar. Där bedrivs experiment på djur för att undersöka medvetandets mekanismer, och hjärnaktiviteten tankas upp i en mima. Hemma finns familjetryggheten, men med tiden dras hon alltmer till miman. När hon hittar en övergiven harunge på vägen till jobbet tas allt till en ny nivå. Harungen är en suggestiv debutroman om en kvinna som överskrider gränser, och om vår eviga fascination inför det okontrollerbara.",

    false,
    false,
    false,
    false
  ),
  new Book(
    "m8",
    "y1",
    "Binas historia",
    "Maja Lunde",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "http://zone-critique.com/wp-content/uploads/2014/03/9782021117707.jpg",
    'Binas historia" är en roman om en av de slumrande katastrofer som alltmer kommer i blickfånget: bidöden. Krisen med bisamhällen som slås ut världen över kan se ut som en perifer detalj i det ekologiska systemet. Men utan bin, ingen pollinering. Utan pollinering, inga växter. Och vad är förutsättningarna för liv utan växter? William är en melankolisk biolog och fröhandlare i England 1852, som bygger en helt ny sorts bikupor för att ge ära och berömmelse åt sig själv och familjen. George är biodlare i USA 2007 och kämpar för sin överlevnad men hoppas att sonen kan rädda gården. Men något håller på att hända med hans bin. Tao arbetar med handpollinering i ett framtida Kina där bina har försvunnit. Hennes högsta önskan är att sonen ska få ett bättre liv. Från de första trevande försöken att odla bin över det industriella lantbruket till en framtid utan bin. "Binas historia" är tre vackert och överraskande sammanfogade berättelser om relationer mellan föräldrar och barn, och om människans sårbarhet. Maja Lunde har skrivit manus för film och tv, och givit ut flera böcker för barn och ungdom, bland annat serien "Världens bästa gäng", som i höst ges ut på Natur & Kultur. "Binas historia" är hennes första roman för vuxna och har sålts till femton länder. Maja Lunde är bosatt i Oslo, Norge.',

    false,
    false,
    false,
    false
  ),
  new Book(
    "m9",
    "y1",
    "Scum Manifesto",
    "Valerie Solanas",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "http://zone-critique.com/wp-content/uploads/2014/03/9782021117707.jpg",
    "SCUM Manifesto was considered one of the most outrageous, violent and certifiably crazy tracts when it first appeared in 1968. Valerie Solanas, the woman who shot Andy Warhol, self-published this work just before her rampage against the king of Pop Art made her a household name and resulted in her confinement to a mental institution. But the Manifesto, for all its vitriol, is impossible to dismiss as just the rantings of a lesbian lunatic. In fact, the work has indisputable prescience, not only as a radical feminist analysis light-years ahead of its timepredicting artificial insemination, ATMs, a feminist uprising against under-representation in the artsbut also as a stunning testament to the rage of an abused and destitute woman. The focus of this edition is not on the nostalgic appeal of the work, but on Avital Ronell’s incisive introduction, “Deviant Payback: The Aims of Valerie Solanas.” Here is a reconsideration of Solanas’s infamous text in light of her social milieu, Derrida’s “The Ends of Man” (written in the same year), Judith Butler’s Excitable Speech, Nietzsche’s Ubermensch and notorious feminist icons from Medusa, Medea and Antigone, to Lizzie Borden, Lorenna Bobbit and Aileen Wournos, illuminating the evocative exuberance of Solanas’s dark tract.",

    false,
    false,
    false,
    false
  ),
  new Book(
    "m10",
    "y1",
    "I vilt tillstånd",
    "Roxane Gay",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "http://zone-critique.com/wp-content/uploads/2014/03/9782021117707.jpg",
    "Mireille Jameson, dotter till en välbärgad familj i Haiti och numer boende i USA, kidnappas i Port-au-Prince mot en lösesumma på 1 miljon dollar. I 13 dagar hålls hon fången medan hennes far vägrar betala och hennes man kämpar för att få henne fri. När hon äntligen släpps börjar hennes mödosamma kamp för att återvända till sitt liv. I vilt tillstånd är både ett familjedrama, en utmanande politisk roman och en stark roman om kärlek.",

    false,
    false,
    false,
    false
  ),
  new Book(
    "m11",
    "y2",
    "Orlando",
    "Virginia Woolf",

    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "http://zone-critique.com/wp-content/uploads/2014/03/9782021117707.jpg",
    "Virginia Woolf's Orlando 'The longest and most charming love letter in literature', playfully constructs the figure of Orlando as the fictional embodiment of Woolf's close friend and lover, Vita Sackville-West. Spanning three centuries, the novel opens as Orlando, a young nobleman in Elizabeth's England, awaits a visit from the Queen and traces his experience with first love as England under James I lies locked in the embrace of the Great Frost. At the midpoint of the novel, Orlando, now an ambassador in Constantinople, awakes to find that he is now a woman, and the novel indulges in farce and irony to consider the roles of women in the 18th and 19th centuries. As the novel ends in 1928, a year consonant with full suffrage for women. Orlando, now a wife and mother, stands poised at the brink of a future that holds new hope and promise for women.",

    false,
    false,
    false,
    false
  ),
  new Book(
    "m12",
    "y2",
    "Norwegian Wood",
    "Haruki Murakami",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "http://zone-critique.com/wp-content/uploads/2014/03/9782021117707.jpg",
    "Toru, a quiet and preternaturally serious young college student in Tokyo, is devoted to Naoko, a beautiful and introspective young woman, but their mutual passion is marked by the tragic death of their best friend years before. Toru begins to adapt to campus life and the loneliness and isolation he faces there, but Naoko finds the pressures and responsibilities of life unbearable. As she retreats further into her own world, Toru finds himself reaching out to others and drawn to a fiercely independent and sexually liberated young woman. A magnificent blending of the music, the mood, and the ethos that was the sixties with the story of one college student's romantic coming of age, Norwegian Wood brilliantly recaptures a young man's first, hopeless, and heroic love.",

    false,
    false,
    false,
    false
  ),
  new Book(
    "m13",
    "y2",
    "En debutants dagbok",
    "Wera von Essen",
    "novel",
    [1, 2, 3, 4, 5],

    "220",
    "http://zone-critique.com/wp-content/uploads/2014/03/9782021117707.jpg",
    '"Helgen sade mig följande: att jag måste bli helt besatt. Jag måste kapa allt. Jag måste ta mitt eget drama på allra största allvar. Ingenting får vara viktigare än mitt eget drama. Efter att jag hade svimmat i Traneberg ringde Stig och frågade vad blodfullmåne betyder. Han har förstått vad jag är för något. Vi var tysta en lång stund i telefonen. Östermalmarnas ansikten tycktes grimasera i dag, elegant och avmätt. Mitt självtvivel är för starkt. Det trycker på, hårt hårt, kräver att bli övervunnet. Det fungerar inte längre, jag måste börja skriva dagbok igen. Annars kommer jag att, som man säger, »tappa det«."',

    false,
    false,
    false,
    false
  ),

  new Book(
    "m14",
    "y2",
    "How to be both",
    "Ali Smith",
    "novel",
    [1, 3, 4, 5, 6, 8],

    "220",
    "http://zone-critique.com/wp-content/uploads/2014/03/9782021117707.jpg",
    "Passionate, compassionate, vitally inventive and scrupulously playful, Ali Smith’s novels are like nothing else. A true original, she is a one-of-a-kind literary sensation. Her novels consistently attract serious acclaim and discussion—and have won her a dedicated readership who are drawn again and again to the warmth, humanity and humor of her voice. How to be both is a novel all about art’s versatility. Borrowing from painting’s fresco technique to make an original literary double-take, it’s a fast-moving genre-bending conversation between forms, times, truths and fictions. There’s a Renaissance artist of the 1460s. There’s the child of a child of the 1960s. Two tales of love and injustice twist into a singular yarn where time gets timeless, structural gets playful, knowing gets mysterious, fictional gets real—and all life’s givens get given a second chance.",

    false,
    false,
    false,
    false
  ),
];
