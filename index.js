const data = require('./claims.json')

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

let rolelist = `Blackmailer
BM
BMr
BMer
Consigliere
consig
Consort
Disguiser
disg
dis
Framer
Forger
Godfather
gf
Janitor
jan
janny
jany
jani
Mafioso
maf
Hypnotist
Ambusher
BodyGuard
bg
Crusader
Psychic
Doctor
doc
Escort
esc
Investigator
inv
invest
investi
Jailor
jailer
Lookout
lo
Mayor
Medium
med
Retributionist
ret
retri
Sheriff
sher
sherriff
sherrif
sheri
sherri
Spy
Transporter
tran
trans
Trapper
Veteran
vet
Tracker
Vigilante
vig
vigi
VampireHunter
Amnesiac
Arsonist
arso
Executioner
exe
exec
Jester
jest
Serial Killer
sk
Survivor
Witch
Werewolf
ww
Vampire
Guardian Angel
Pirate
Plaguebearer
Pestilence
Juggernaut
tk
ts
rt
ti
tp
ne
nk
town
neut neutral
evil
good
neutral killer
town support
town killing
town killer
random town
random mafia
town inv
town invest
town investi
town investigative
town investigator
town protective
town protector`.toUpperCase().split('\n')

let TOWN = `BodyGuard
Crusader
Psychic
Doctor
Escort
Investigator
Jailor
Lookout
Mayor
Medium
Retributionist
Sheriff
Spy
Transporter
Trapper
Veteran
Tracker
Vigilante
VampireHunter`.toUpperCase().split('\n')

function deAbbreviate(role) {
  role = role.replace(/\bBM\b/, 'BLACKMAILER')
  role = role.replace(/\bBMR\b/, 'BLACKMAILER')
  role = role.replace(/\bBMER\b/, 'BLACKMAILER')
  role = role.replace(/\bCONSIG\b/, 'CONSIGLIERE')
  role = role.replace(/\bDIS\b/, 'DISGUISER')
  role = role.replace(/\bDISG\b/, 'DISGUISER')
  role = role.replace(/\bGF\b/, 'GODFATHER')
  role = role.replace(/\bJAN\b/, 'JANITOR')
  role = role.replace(/\bJANI\b/, 'JANITOR')
  role = role.replace(/\bJANY\b/, 'JANITOR')
  role = role.replace(/\bJANNI\b/, 'JANITOR')
  role = role.replace(/\bJANNY\b/, 'JANITOR')
  role = role.replace(/\bMAF\b/, 'MAFIA')
  role = role.replace(/\bBG\b/, 'BODYGUARD')
  role = role.replace(/\bDOC\b/, 'DOCTOR')
  role = role.replace(/\bESC\b/, 'ESCORT')
  role = role.replace(/\bINV\b/, 'INVESTIGATOR')
  role = role.replace(/\bINVEST\b/, 'INVESTIGATOR')
  role = role.replace(/\bINVESTI\b/, 'INVESTIGATOR')
  role = role.replace(/\bJAILER\b/, 'JAILOR')
  role = role.replace(/\bLO\b/, 'LOOKOUT')
  role = role.replace(/\bMED\b/, 'MEDIUM')
  role = role.replace(/\bRET\b/, 'RETRIBUTIONIST')
  role = role.replace(/\bRETRI\b/, 'RETRIBUTIONIST')
  role = role.replace(/\bRETRIB\b/, 'RETRIBUTIONIST')
  role = role.replace(/\bSHER\b/, 'SHERIFF')
  role = role.replace(/\bSHERRIFF\b/, 'SHERIFF')
  role = role.replace(/\bSHERRIF\b/, 'SHERIFF')
  role = role.replace(/\bSHERI\b/, 'SHERIFF')
  role = role.replace(/\bSHERRI\b/, 'SHERIFF')
  role = role.replace(/\bTRAN\b/, 'TRANSPORTER')
  role = role.replace(/\bTRANS\b/, 'TRANSPORTER')
  role = role.replace(/\bVET\b/, 'VETERAN')
  role = role.replace(/\bVIG\b/, 'VIGILANTE')
  role = role.replace(/\bVIGI\b/, 'VIGILANTE')
  role = role.replace(/\bARSO\b/, 'ARSONIST')
  role = role.replace(/\bEXE\b/, 'EXECUTIONER')
  role = role.replace(/\bEXEC\b/, 'EXECUTIONER')
  role = role.replace(/\bJEST\b/, 'JESTER')
  role = role.replace(/\bSK\b/, 'SERIAL KILLER')
  role = role.replace(/\bWW\b/, 'WEREWOLF')
  role = role.replace(/\bINNO\b/, 'INNOCENT')
  role = role.replace(/\bTS\b/, 'TOWN SUPPORT')
  role = role.replace(/\bTK\b/, 'TOWN KILLING')
  role = role.replace(/\bTOWN KILLER\b/, 'TOWN KILLING')
  role = role.replace(/\bRT\b/, 'RANDOM TOWN')
  role = role.replace(/\bRM\b/, 'RANDOM MAFIA')
  role = role.replace(/\bTI\b/, 'TOWN INVESTIGATIVE')
  role = role.replace(/\bTOWN INV\b/, 'TOWN INVESTIGATIVE')
  role = role.replace(/\bTOWN INVEST\b/, 'TOWN INVESTIGATIVE')
  role = role.replace(/\bTOWN INVESTI\b/, 'TOWN INVESTIGATIVE')
  role = role.replace(/\bTOWN INVESTIGATOR\b/, 'TOWN INVESTIGATIVE')
  role = role.replace(/\bTP\b/, 'TOWN PROTECTIVE')
  role = role.replace(/\bTP\b/, 'TOWN PROTECTOR')
  role = role.replace(/\bNE\b/, 'NEUTRAL EVIL')
  role = role.replace(/\bNEUT\b/, 'NEUTRAL')
  role = role.replace(/\bNK\b/, 'NEUTRAL KILLER')
  return role
}

roles = {}
for (let role in data) {
  roles[role] = { role: data[role], phrases: [] }
  for (let phrase in data[role]) {
    if ((phrase.split(' ').length - 1) <= 3)
    roles[role].phrases.push({phrase: phrase, count: data[role][phrase]})
  }
  roles[role].phrases = roles[role].phrases.sort((a, b) => (a.count < b.count) ? 1 : -1)
}

for (let role in roles) {
  roles[role].claims = {}
  //console.log(`--------${role}--------`)
  for (let i = 0; i < roles[role].phrases.length; i++) {
    let phrase = roles[role].phrases[i].phrase
    if (phrase.includes('NOT')) { continue }
    phrase = phrase.split(' ')
    let temp = phrase
    for (let j = 0; j < phrase.length; j++) {
      let word = phrase[j]
      if (rolelist.includes(word)) {
        word = deAbbreviate(word)
        //console.log(`${temp.join(' ')} => ${word}`)
        if (roles[role].claims[word] === undefined) {
          roles[role].claims[word] = 0
        }
        roles[role].claims[word]++
      }
    }
    //console.log(`${roles[role].phrases[i].count}`.yellow, `${roles[role].phrases[i].phrase}`.green)
  }
  //console.log(roles[role].claims)
}

console.log(`|ROLE|CLAIM|OCCURRENCES|||||||||||||||||`)
console.log(`|:--|:--|--:|:--|--:|:--|--:|:--|--:|:--|--:|:--|--:|:--|--:|:--|--:|:--|--:|`)

for (let role in roles) {
  roles[role].claimsARRAY = []
  for (let claim in roles[role].claims) {
    roles[role].claimsARRAY.push({ claim: claim, count: roles[role].claims[claim] })
  }
  roles[role].claimsARRAY = roles[role].claimsARRAY.sort((a, b) => (a.count < b.count) ? 1 : -1)
  //console.log(`----${role}----`)
  //console.log(roles[role].claimsARRAY)
  if (TOWN.includes(role.toUpperCase())) { continue }
  let output = `|**${role}**|`
  for (let i = 0; i < 9; i++) {
    output += `${roles[role].claimsARRAY[i].claim.toLowerCase().capitalize()}|${roles[role].claimsARRAY[i].count}|`
  }
  console.log(output)
}
