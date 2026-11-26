/* Teachings for nights 1-7: the author's own words in modern English, first person, no narrator.
   Rendered from the public-domain English translations (and, for night 6, from the Latin). */
const WHO=["Irenaeus, pastor in Lyon","Athanasius, pastor in Alexandria","Cyril, pastor in Jerusalem","Ephrem, hymn writer in Syria","Gregory, preacher in Constantinople","Augustine, pastor in Hippo","Leo, pastor in Rome"];
const TEACH=[
[`Follow the only true and steadfast Teacher, the Word of God, our Lord Jesus Christ. Through his boundless love he became what we are, so that he might bring us to be what he is himself.`,
`There is no other way we could have learned the things of God, unless our Teacher, who is the Word, had become man. No one else had the power to reveal to us the things of the Father, except his own Word. For who else has known the mind of the Lord? Who else has been his counselor?`,
`Again, we could have learned in no other way than by seeing our Teacher, and hearing his voice with our own ears. So that, by copying his works and doing his words, we might have communion with him, and receive growth from the one who is perfect, who was before all creation.`,
`We were only lately made, by the one who alone is supremely good, the one who has the gift of immortality. We were formed after his likeness, and chosen beforehand in the Father's foreknowledge, we who did not yet exist. And at the appointed time we have received the blessings of salvation through the ministry of the Word, who is perfect in all things: the mighty Word, and truly man. He redeemed us by his own blood, giving himself as a ransom for those who had been led into captivity.`,
`The enemy ruled over us unjustly. Though by nature we belonged to almighty God, he tore us away and made us his own followers. But the Word of God, powerful in all things and never lacking in his own justice, turned rightly against that rebellion and won back from it what was his own. He did not do it by force, the way the enemy had seized us at the beginning, greedily snatching what was not his. He did it by persuasion, as is fitting for a God of wisdom, who does not use violence to get what he desires. So justice was not broken, and the ancient handiwork of God was not left to perish.`,
`So the Lord has redeemed us through his own blood, giving his soul for our souls and his flesh for our flesh. And he has poured out the Spirit of the Father to unite God and man: bringing God down to us through the Spirit, and raising us up to God by his own becoming flesh. At his coming he gave us true and lasting immortality, through communion with God.`],
[`The Word of God was never far from us before. No part of creation is left empty of him; he fills all things everywhere. But now he comes down to us in a new way, out of love, to show himself to us.`,
`He saw the human race, the people he had made, wasting away, and death ruling over them. He saw that what God had made was perishing. He could not bear that death should have the mastery. So he took pity on our race, and had mercy on our weakness, and came down to where we are.`,
`He took a body for himself, a body no different from ours. He made it his own, as a temple to live in. And because all of us were under the sentence of death, he gave his body over to death in place of all, and offered it to the Father. He did this out of sheer love for us.`,
`The Word saw that our ruin could be undone only by death. Yet he, the Word, being immortal and the Son of the Father, could not die. So he took to himself a body that could die, so that this body, belonging to the Word who is above all, might be worthy to die in place of all. And because the Word had come to live in it, it would remain incorruptible, and from then on, by the grace of the resurrection, ruin would be held back from everyone.`,
`Think of a great king who enters a large city and makes his home in one of its houses. That city is held in high honor. No enemy or bandit comes down on it any more to overthrow it. It is counted worthy of every care, because the king has taken up his home in a single house there. So it has been with the King of all.`,
`For now that he has come to our realm, and made his home in one body among his own, the whole plot of the enemy against humankind is stopped, and the ruin of death that once held us is undone. The human race would have gone to ruin, if the Lord and Savior of all, the Son of God, had not come among us to put an end to death.`],
[`We do not preach just one coming of Christ, but a second as well, far more glorious than the first. The first showed us his patience. The second brings with it the crown of God's kingdom.`,
`Nearly everything about our Lord Jesus Christ comes in pairs. He was born twice: once from God before time began, and once from a virgin at the close of the ages. His comings are twofold as well: one unseen, like rain falling on a fleece, and a second, open and visible, which is still to come.`,
`At his first coming he was wrapped in strips of cloth and laid in a manger. At his second he will clothe himself in light as in a garment. At his first coming he endured the cross, scorning its shame. At his second he will come with an army of angels, receiving glory.`,
`So we do not rest only on his first coming. We look forward to his second as well. When he first came we said, Blessed is he who comes in the name of the Lord. At his second coming we will say the same again, so that when we meet our Master with the angels we may worship him and say, Blessed is he who comes in the name of the Lord.`,
`The Savior is coming, not to be judged again, but to judge those who judged him. He who kept silent when he was judged will remind the wrongdoers of what they dared to do at the cross, and will say, You did these things, and I kept silent. The first time he came to teach people by persuasion. But this time, whether they want him or not, they will have him as their King.`,
`The prophet Malachi speaks of both. Of the first he says, The Lord whom you seek will suddenly come to his temple. And of the second: But who can endure the day of his coming? Who can stand when he appears? For he comes like a refiner's fire.`,
`Paul also points to these two comings when he writes to Titus. The grace of God has appeared, bringing salvation to all people, teaching us to live upright and godly lives in this present world, while we look for the blessed hope, the appearing of the glory of our great God and Savior, Jesus Christ. Do you see how he speaks of a first coming, for which he gives thanks, and of a second, for which we are waiting?`],
[`This is the day that made them glad: the prophets, the kings and the priests. For on this day their words came true, and everything they foretold was carried out.`,
`On this day the Virgin brought forth Immanuel in Bethlehem. The voice that Isaiah spoke long ago became real today.`,
`The psalm that David once sang was fulfilled today. The word that Micah once spoke has truly come to pass today. For a Shepherd came out of Bethlehem, and his staff rules over souls.`,
`Look! A star has shone out from Jacob, and a ruler has risen up from Israel. The prophecy that Balaam spoke has found its meaning today.`,
`The hidden Light came down, and his beauty shone out from a body. The light that Zechariah spoke of shone today in Bethlehem. The Light of the kingdom has risen in the city of the King.`,
`The blessing that Jacob gave has reached its fulfillment today. That tree of life brings hope to people who must die.`,
`Today the Child was born, and his name was called Wonder. For it is a wonder that God shows himself as a baby.`,
`He came up like a root out of dry ground. What was said in secret has been done in the open today.`,
`Blessed be the True One, who came from the Father of truth, and fulfilled the words of the true prophets. They were all accomplished, in truth.`,
`From your treasure house, Lord, from the storehouses of your Scriptures, bring out the names of the righteous of old, who longed to see your coming.`],
[`Christ is born: glorify him! Christ comes from heaven: go out to meet him! Christ is on earth: be lifted up! Sing to the Lord, all the earth. And, to say both in one breath: let the heavens rejoice and the earth be glad, because he who is of heaven is now on earth.`,
`Christ is in the flesh: rejoice, with trembling and with joy. With trembling because of your sins. With joy because of your hope.`,
`Who does not worship him who is from the beginning? Who does not glorify him who is the last?`,
`Again the darkness is past. Again light is made. Let the people who sat in the darkness of ignorance see the great Light of full knowledge. Old things have passed away; look, all things have become new. The letter gives way, and the Spirit comes to the front. The shadows flee, and the Truth comes in upon them.`,
`The laws of nature are overturned. Christ commands it; let us not set ourselves against him. Clap your hands, all you peoples, because to us a child is born, and to us a son is given, and the government rests on his shoulder. Let John cry out, Prepare the way of the Lord. I too will cry out the power of this day. He who is without flesh takes flesh. The Son of God becomes the Son of Man: Jesus Christ, the same yesterday, today and forever.`,
`This is the festival we keep. This is what we celebrate today: the coming of God to man, so that we might go out to God, or rather, to say it more truly, go back to him. So that, putting off the old self, we might put on the new. And just as we died in Adam, so we might live in Christ: born with Christ, crucified with him, buried with him, and raised with him.`,
`So let us keep the feast, not the way the world throws a party, but in a godly way. Not in the way of this world, but in a way above this world. Not as our own, but as belonging to him who is ours, or rather, to our Master. Not as a day of weakness, but of healing. Not as a day of being made, but of being made new.`],
[`The Word of the Father, through whom time itself was made, became flesh, and made for us his birthday in time. He, without whose divine say-so not a single day rolls by, willed to have one day for his human birth.`,
`With the Father, he comes before all the ages. Born of a mother on this day, he stepped into the passing of the years.`,
`The Maker of man was made man.`,
`So that the Ruler of the stars might nurse at the breast. So that the Bread might hunger. So that the Fountain might thirst. So that the Light might sleep. So that the Way might be wearied by the journey.`,
`So that the Truth might be accused by false witnesses. So that the Judge of the living and the dead might be judged by a mortal judge. So that Justice might be condemned by the unjust. So that Discipline might be beaten with whips.`,
`So that the Vine might be crowned with thorns. So that the Foundation might be hung on a tree. So that Strength might be made weak. So that Health might be wounded. So that Life might die.`,
`He bore these things, and things like them, for us, though he did not deserve them, to set free those who did not deserve it. He had done nothing to earn such evils. We had done nothing to earn such good.`],
[`Our Savior, dearly beloved, was born today: let us rejoice. There is no proper place for sadness on the birthday of Life itself, the Life that ends our dread of death and brings us the joy of the eternity he has promised.`,
`No one is shut out from a share in this happiness. All of us have one and the same reason for joy. For our Lord, the destroyer of sin and death, finds no one free from guilt, and so he has come to set us all free.`,
`Let the saint rejoice, for he is drawing near to victory. Let the sinner be glad, for he is invited to pardon. Let the outsider take heart, for he is called to life.`,
`For the Son of God, at the time appointed by the unsearchable wisdom of God, took on our human nature in order to reconcile it to its Maker, so that the devil, the inventor of death, might be defeated through the very nature he had once defeated.`,
`So, dearly beloved, let us give thanks to God the Father, through his Son, in the Holy Spirit. In his great mercy, with which he loved us, he has had pity on us. When we were dead in our sins he made us alive together with Christ, so that in him we might be a new creation and a new work of his hands.`,
`Let us then put off the old self with its deeds. And since we have been given a share in the birth of Christ, let us turn away from the works of the flesh.`,
`Christian, recognize your dignity. You have become a sharer in the divine nature: do not go back to your former lowness by living beneath what you are. Remember the Head, and the Body of which you are a part. Keep in mind that you were rescued from the power of darkness and brought out into the light and the kingdom of God.`,
`The price paid for you is the blood of Christ. He who redeemed you in mercy will judge you in truth; and he reigns with the Father and the Holy Spirit for ever and ever. Amen.`]
];
NIGHTS.forEach((x,i)=>{if(TEACH[i])x.t=TEACH[i];x.w=WHO[i]||x.c.split(",")[0]});
NIGHTS[3].m="Every promise came true today: God shows himself as a baby";
/* More teachings, keyed by the entry's position in the original list above. */
const MORE={
9:{w:"Anselm, talking with his student Boso",vt:"Wherefore in all things it behoved him to be made like unto his brethren, that he might be a merciful and faithful high priest in things pertaining to God, to make reconciliation for the sins of the people.",pr:"Lord Jesus, only God could save us, and only one of us should. You are both. We confess our sins to you now, in the quiet. Thank you that the price is paid in full. Amen.",t:[
`Anselm: Man cannot be saved unless the price paid to God for human sin is greater than everything in the universe besides God.`,`Boso: So it seems.`,
`Anselm: And whoever can give God something of his own that is worth more than everything God possesses must himself be greater than everything except God.`,`Boso: I cannot deny it.`,
`Anselm: So no one but God can make this payment.`,`Boso: So it seems.`,
`Anselm: But no one ought to make it except man. Otherwise it is not man who makes things right.`,`Boso: Nothing seems more just.`,
`Anselm: If, then, the heavenly kingdom must be filled with men and women, and this cannot happen unless the payment is made, which no one but God can make and no one but man ought to make, then it is necessary that one who is both God and man should make it.`,
`Boso: Now God be praised! We have made a great discovery. Go on as you have begun, for I hope God will help you.`]},
17:{w:"Thomas Watson, pastor in London",vt:"And without controversy great is the mystery of godliness: God was manifest in the flesh, justified in the Spirit, seen of angels, preached unto the Gentiles, believed on in the world, received up into glory.",pr:"Father, it was not our deserving but our misery that moved you. You sent your Son, and he stooped to take our flesh. We did nothing to earn this love. Thank you. Amen.",t:[
`Christ humbled himself in his incarnation: in taking flesh and being born. And it was real flesh that Christ took. Not the image of a body, but a true body. As bread is made of wheat, and wine is made of the grape, so Christ was made of a woman.`,
`This is a glorious mystery: God revealed in the flesh. In the creation, man was made in God's image. In the incarnation, God was made in man's image.`,
`But was there no other way to restore fallen man than for God to take flesh? We must not demand a reason for God's will. It is dangerous to pry into God's secrets. We are not to argue, but to adore. The wise God judged this the best way to redeem us. Only a man could satisfy God's justice, and yet only God could do it. So Christ, being both God and man, is the fittest one to take up this work of redemption.`,
`Why was Jesus Christ made flesh? The first cause, the thing that moved God, was free grace. It was the Father's love that sent Christ, and Christ's love that brought him to take our flesh. Love was at the very heart of it. Christ is God and man because he loves mankind. It was not our deserving but our misery that moved him.`,
`God himself, though almighty, was overcome by love. As Christ's taking our nature was a masterpiece of wisdom, so it was a monument of free grace.`,
`Christ took our flesh so that he might take our sins upon him. He took our flesh to make our human nature lovely to God, and God's nature lovely to us. As shepherds once wore sheepskins to be more welcome to the sheep, so Christ clothed himself with our flesh, that God might be more welcome to us.`,
`See here, as in a mirror, the infinite love of God the Father. When we had lost ourselves by sin, God, in the riches of his grace, sent his Son, born of a woman, to redeem us. And behold the infinite love of Christ, that he was willing to stoop so low as to take our flesh.`]},
12:{w:"Martin Luther, pastor in Wittenberg",t:[
`The right and gracious faith that God demands is this: that you firmly believe Christ is born for you, and that his birth took place for your good.`,
`Listen to the angel's message: I bring you good news of great joy, which shall be for all people; for to you is born this day a Savior, who is Christ the Lord. In these words you see clearly that he is born for us.`,
`The angel does not simply say, Christ is born. He says, to you he is born. Nor does he say, I bring good news. He says, to you I bring good news of great joy. And this joy was not to stay with Christ. It shall be for all people.`,
`Christ has a pure, innocent and holy birth. We have an unclean and sinful birth, as David says: in sin did my mother conceive me. Nothing can help this birth of ours except the pure birth of Christ.`,
`But Christ's birth cannot be handed out like a thing you hold in your hand, and that would not help us anyway. So it is given to us through the Word, as the angel says, to everyone who firmly believes. Christ willed to be born for this very purpose: that through him we might be born again.`,
`See how Christ takes our birth from us and absorbs it in his own, and gives us his, so that in it we become pure and holy, as if it were our own. So every Christian may rejoice and glory in Christ's birth as much as if he himself had been born as Christ was.`,
`Oh, this is the great joy of which the angel speaks! This is the comfort and the overflowing goodness of God: that whoever believes this can boast that Christ is his brother and God is his Father.`,
`This is what Isaiah means: to us a child is born, to us a son is given. To us, to us, to us he is born, and to us he is given.`,
`So see to it that you do not treat the Gospel only as a story, for that soon passes. Nor only as an example, for it is worth nothing without faith. Make this birth your own, and let Christ be born in you.`]},
16:{w:"Lancelot Andrewes, preacher in London",t:[
`The angel's sermon has two parts. The first is his birth. The second is his being found. So this is a double feast: not only the feast of his birth, but also the feast of his finding.`,
`For the angel does not stop at "to you is born." He goes further. It is not enough that Christ is born. To have any good from his birth, we must find him. "He is born" is his part. "You will find him" is ours.`,
`For what is "he is born" without "you will find"? A man may say, He is born. What are we the better, if we do not find him? As good not born, as not known to us. He is born to the world; but he is born to us only when he is known to us, when we find him, and not before. Christ found is more than Christ born.`,
`And how shall they find him without a sign? They know the day: it is today. They know the place: it is Bethlehem. But when they come there, what then? The town is so full of strangers that there is no room in the inns. Where should they turn? Oh, that we had a sign by which to find him!`,
`And this is the sign, and it is a sign to wonder at. Indeed, every word here is a wonder. An infant: the Word without a word, the eternal Word not able to speak a word. Surely a wonder.`,
`Wrapped in swaddling clothes: that is a wonder too. He who takes the vast body of the sea and wraps it in bands of darkness has come to be wrapped in cloths himself.`,
`But in the manger: there is the wonder. Children do not lie there. He does. There lies the Lord of glory, without glory. Instead of a palace, a poor stable. Instead of a cradle of state, a manger for beasts. No pillow but a lock of hay. No hangings but dust and cobwebs. No attendants but the animals. This is a sign able to amaze anyone.`]},
19:{w:"George Whitefield, traveling preacher",t:[
`Now I will show you who they are who rightly observe, and truly keep, the birth of our Redeemer. And then, my brothers, you must make your choice, for there is no middle ground.`,
`First, those who spend their hours in reading, in praying, and in talking about the things of God, are spending their time well and truly keeping this festival.`,
`What could we do with our time that is more worthy than reading of what our dear Redeemer has done and suffered? And when we read of our Savior's sufferings, it should move us to pray: that we may have a share in the Lord Jesus Christ, and that his blood and death may atone for our sins and make us holy. Pray hard, I urge you, that you may be clothed in his righteousness.`,
`If you are in company, let your talk be useful and good for one another. Not about your clothes, or your amusements, or your profits, or your worldly business. Tell one another what great things the Lord has done for your souls: how he rescued you from the enemy, and set your feet upon the rock of ages, the Lord Jesus Christ.`,
`Other talk grows stale by being repeated. But with Christ there is always something new to lift your thoughts. Spend your time on him. If you belong to Jesus, this is work that will last you into eternity.`,
`Which will stand best at the last day? Which will bring you the most comfort and peace in your dying hour? Live now, and spend your time now, as you will wish you had when you come to die.`,
`Secondly, use the good things of life with moderation. I am not against eating and drinking the good things of life. I am only against excess.`,
`And instead of running into excess, let the money you might have spent pampering yourselves be given to feed the poor. This is the season when they most often want help. If any of you have poor friends or neighbors in distress, help them. And do not stop at the people you know. Help the poor in general.`]},
24:{w:"B. B. Warfield, teacher at Princeton",t:[
`He did not think of himself. He did not even hold on to his own divine glory. He did not look to his own interests.`,
`He did not stand off from the world, and withdraw into his own soul, and brood over his own needs. Out of love for others he came into the world. He forgot himself in the needs of others, and once and for all he offered himself on the altar of compassion.`,
`Self-sacrifice is what brought Christ into the world. And self-sacrifice will lead us, his followers, not away from people but right into the middle of them.`,
`Wherever people suffer, there we will be to comfort them. Wherever people struggle, there we will be to help. Wherever people fail, there we will be to lift them up. Wherever people succeed, there we will be to rejoice with them.`,
`Self-sacrifice does not mean being indifferent to our own times and to the people around us. It means being absorbed in them. It means forgetting ourselves in others. It means entering into every person's hopes and fears, longings and despairs.`,
`It means not that we should live one life, but a thousand lives: binding ourselves to a thousand souls by the threads of so loving a sympathy that their lives become ours.`,
`So, after all, this is the road to the highest growth, the only way we can truly become what we were made to be. But we will not take it up with that goal in mind, for that would dry up its spring. We cannot be self-forgetful on purpose, or unselfish for selfish reasons.`,
`Only when we humbly walk this path, truly seeking not our own good but the good of others, will we find the promise come true: whoever loses his life will find it. The path of self-sacrifice is the path to glory.`]},
20:{w:"John Henry Newman, preacher in Oxford",t:[
`Now, what is watching? I think it may be explained like this.`,
`Do you know the feeling of expecting a friend, expecting him to come, and he is late? Do you know what it is to be in unpleasant company, and to wish for the time to pass, and the hour to strike when you may be free? Do you know what it is to be anxious whether something will happen or not, so that your heart beats when you are reminded of it, and it is the first thing you think of in the morning?`,
`Do you know what it is to have a friend in a distant country, to wait for news of him, and to wonder from day to day what he is doing now, and whether he is well? Do you know what it is to live so close to someone that your eyes follow his, that you read his soul, that you see every change in his face, that you know his wishes before he speaks, that you smile when he smiles and are sad when he is sad?`,
`To watch for Christ is a feeling like all of these, as far as the feelings of this world can picture those of another.`,
`He watches for Christ who has a tender, eager, alert mind. Who is awake, alive, quick-sighted, zealous in seeking and honoring him. Who looks out for him in all that happens. And who would not be surprised, who would not be overwhelmed or thrown into confusion, if he found that Christ was coming at once.`,
`Year passes after year silently, and Christ's coming is always nearer than it was. Oh, that as he comes nearer to earth, we may come nearer to heaven!`,
`Pray him to give you the heart to seek him in sincerity. You have one work only: to carry your cross after him. Every act of obedience is a step toward him. He is not far off, though he seems so. He stands just behind this visible world that hides him from us. Earth and sky are only a veil between him and us, and the day will come when he will tear that veil away and show himself.`,
`Blessed are the servants whom the Lord, when he comes, finds watching. May this be the portion of every one of us. It is hard to attain, but it is dreadful to miss. Life is short. Death is certain. And the world to come is forever.`]},
23:{w:"Charles Spurgeon, preacher in London",t:[
`Now let me speak for a moment about the people to whom this joy comes.`,
`Notice how the angel begins: Behold, I bring you good news of great joy, for to you is born this day. So then, the joy began with the first who heard it: the shepherds. To you, he says. For to you is born.`,
`Dear hearer, shall the joy begin with you today? For it does you little good that Christ was born, or that Christ died, unless to you a child is born, and for you Jesus bled. A personal share in him is the main thing.`,
`But I am poor, says one. So were the shepherds. O you who are poor, to you this wonderful child is born.`,
`But I am unknown, says another. So were the shepherds who kept their flocks by night. Yet God knew them, and he knows you.`,
`But I have no learning, says a third. I cannot understand much. Very well. The plainness of the shepherds did not keep them from receiving Christ. It even helped them.`,
`I do not preach to you a Christ for the great and the grand. I preach the Savior of ordinary people, the friend of tax collectors and sinners.`,
`If I truly believe in Jesus, then Christ is born for me, and I may be as sure of it as if an angel told me so. For the Scripture says that whoever believes in him belongs to him.`,
`And after the angel had said to you, he went on to say: it shall be for all people. The coming of Christ is a joy to all people. Peace on earth, goodwill toward men.`]},
21:{w:"Charles Spurgeon, preacher in London",t:[
`Why does the text call Bethlehem little among the thousands of Judah? Because Jesus Christ always goes among the little ones.`,
`He was born in the little one among the thousands of Judah. Not on the high hill of Bashan. Not on Hebron's royal mount. Not in the palaces of Jerusalem. But in the humble, yet honorable, village of Bethlehem.`,
`The prophet Zechariah teaches us the same lesson. He saw a man riding on a red horse, standing among the myrtle trees. Now the myrtle trees grow at the bottom of the hill, and the man on the red horse always rides there. He does not ride on the mountaintop. He rides among the humble in heart. For the Lord says: to this one I will look, to the one who is humble and contrite in spirit, and who trembles at my word.`,
`There are some little ones here this morning, little among the thousands. Perhaps no one has ever heard your name. If it were written on your gravestone, the stranger passing by would glance at it and think nothing of it. You do not think much of yourself. You may scarcely be able to read. If you have some gift, others look down on you. And if they do not, you look down on yourself.`,
`You are one of the little ones. Well, Christ is always born in Bethlehem, among the little ones.`,
`Big hearts never get Christ inside them. Christ does not lie in great hearts, but in little ones. Proud and mighty spirits never have Jesus Christ, for he comes in at low doors, and he will not come in at high ones.`,
`Whoever has a broken heart and a lowly spirit shall have the Savior, and no one else. He does not heal the prince and the king, but he binds up the brokenhearted. What a sweet thought this is! He is the Christ of the little ones.`]},
25:{w:"Andrew Murray, pastor in South Africa",t:[
`If salvation truly comes from God, and is entirely his work, just as our creation was, then it follows as a matter of course that our first and highest duty is to wait on him to do that work as it pleases him.`,
`Waiting, then, becomes the only way to experience a full salvation, the only way truly to know God as the God of our salvation. All the difficulties that people say keep them back from full salvation have their cause in this one thing: they do not know, and do not practice, waiting on God.`,
`What the church and all its members need, if the mighty power of God is to be seen in the world, is to return to our true place. It is the place that belongs to us in creation and in redemption alike: the place of absolute and unceasing dependence on God.`,
`The deep need for this waiting on God lies both in the nature of man and in the nature of God.`,
`God, as Creator, formed man to be a vessel in which he could show his power and goodness. Man was not to have in himself a fountain of life, or strength, or happiness. The ever-living God was, each moment, to be the giver of all that he needed.`,
`Man's glory and blessedness was not to be independent, or dependent on himself, but dependent on a God of such infinite riches and love. He was to have the joy of receiving, every moment, out of the fullness of God. This was his blessedness before the fall.`,
`And when he fell away from God, he was still more absolutely dependent on him. There was not the slightest hope of his recovery out of his state of death, except in God, in his power and mercy. It is God alone who began the work of redemption. It is God alone who continues it and carries it on, each moment, in every single believer.`,
`So waiting on God is just as necessary, and must be just as constant and unbroken, as the breathing that keeps us alive.`]},
13:{w:"Thomas Cranmer, in a prayer for Advent",t:[
`Almighty God, give us grace to cast away the works of darkness, and to put on the armor of light, now, in the time of this mortal life, in which your Son Jesus Christ came to visit us in great humility.`,
`So that on the last day, when he shall come again in his glorious majesty to judge both the living and the dead, we may rise to the life immortal.`,
`Through him who lives and reigns with you and the Holy Spirit, now and for ever. Amen.`]},
15:{w:"the Heidelberg Catechism",t:[
`Question: What good does the holy conception and birth of Christ do you?`,
`Answer: He is our Mediator. With his innocence and perfect holiness he covers, in the sight of God, my sin, the sin in which I was conceived.`,
`Question: What comfort is it to you that Christ will come again to judge the living and the dead?`,
`Answer: That in all my sorrows and persecutions, with my head held high, I look for the very same one who once offered himself for me to the judgment of God, and took away all curse from me, to come again as Judge from heaven.`,
`He will cast all his enemies and mine into everlasting condemnation. But he will take me, with all his chosen ones, to himself, into heavenly joy and glory.`]},
8:{w:"the O Antiphons, an ancient Advent prayer",t:[
`O Wisdom, who came from the mouth of the Most High, reaching from one end of the world to the other, and ordering all things with strength and gentleness: come, and teach us the way of understanding.`,
`O Lord and Ruler of the house of Israel, who appeared to Moses in the flame of the burning bush, and gave him the law on Sinai: come, and redeem us with an outstretched arm.`,
`O Root of Jesse, who stands as a sign for the peoples, before whom kings will shut their mouths, and to whom the nations will pray: come and deliver us, and do not delay.`,
`O Key of David, and scepter of the house of Israel, you open and no one can shut, you shut and no one can open: come, and lead the prisoner out of the prison house, the one who sits in darkness and in the shadow of death.`,
`O Dayspring, brightness of the eternal light, and sun of justice: come, and shine on those who sit in darkness and in the shadow of death.`,
`O King of the nations, and their desire, the cornerstone who makes both one: come, and save the human race, whom you formed out of clay.`,
`O Emmanuel, our King and lawgiver, the hope of the nations and their Savior: come and save us, O Lord our God.`]}
};
for(const k in MORE)Object.assign(NIGHTS[k-1],MORE[k]);
NIGHTS.forEach((x,i)=>x.k=i);
/* Behind each door: the card, plus a small mission for tomorrow. No jokes. */
NIGHTS[1].s="Tell the person you prayed for tonight that you prayed for them.";
NIGHTS[5].s="When you eat, drink or lie down to sleep tomorrow, remember that he did too.";
NIGHTS[3].s="Use one of the names you said tonight when you pray in the morning.";
NIGHTS.forEach(x=>{if(x.s)x.s=x.s.replace(/^Tomorrow's mission: /,"").replace(/^./,c=>c.toUpperCase())});
POOL.length=0;POOL.push("Tell one person something good God has done for you.","Do one kind thing in secret.","Read tonight's verse again at breakfast.","Pray tonight's prayer once more before lunch.","Sing tonight's hymn on the way somewhere.");
/* Order by weekly theme, not by date in history. Numbers are positions in the list above. */
const ORDER=[1,2,6,4,5,9,17, 11,12,10,16,7,13,19, 3,20,25,22,15,8,18, 23,14,21,24,26, 27];
{const r=ORDER.map(i=>NIGHTS[i-1]);NIGHTS.length=0;NIGHTS.push(...r)}
/* Narration (ElevenLabs, voice "Julian"), by calendar night. cues = start second of each sentence on screen. */
/* Tried in order: next to the page (artifact, GitHub Pages), then the repo on GitHub, then jsDelivr. */
const AUDIO_BASES=["audio/","https://raw.githubusercontent.com/dmey493/yamgam/hark/Hark/audio/","https://cdn.jsdelivr.net/gh/dmey493/yamgam@hark/Hark/audio/"];
const NARRATION={1:{cues:[0,7,14.1,21.5,27.2,29.8,32.2,39,49.2,56.4,63.6,74.1,80.4,83,89.1,98.6,105.3,112.4,117.9,124.9,135.2]}};
for(const n in NARRATION){const x=NIGHTS[n-1];x.audio=AUDIO_BASES.map(b=>b+"night-"+String(n).padStart(2,"0")+".mp3");x.cues=NARRATION[n].cues}
const UNITS=[{f:1,t:"God with us",s:"Week 1",c:""},{f:8,t:"He comes for you",s:"Week 2",c:"green"},{f:15,t:"He is coming again",s:"Week 3",c:"gold"},{f:22,t:"Joy to the world",s:"Week 4",c:""},{f:27,t:"Christmas Day",s:"The story itself",c:"green"}];
const weekOf=n=>{let u=UNITS[0];for(const x of UNITS)if(x.f<=n)u=x;return u};
const shortDate=n=>{const d=new Date(START);d.setDate(d.getDate()+n-1);return d.toLocaleDateString(undefined,{month:"short",day:"numeric"})};
