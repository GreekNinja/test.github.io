let augmentSum = 0;
let chanceTable = 0
function geta() {
    let requestData = getRequestData('augments');
    fetch(requestData.url, requestData.data).then(r => r.json()).then(r => {
        let createdTabs = [];

        for (let augment of r.augments) { 
            augmentSum += augment.weight;
            console.log('With the weight of ' + augment.id + ', the chance is now ' + augmentSum);
        }

        for (let augment of r.augments) {
            let space;

            let tabtitle = augment.tabTitle;

            if (!createdTabs.includes(tabtitle)) {
                let title = document.createElement('h1');
                title.classList.add('augment-section-title', 'flex-center');
                title.id = 'title_' + tabtitle;
                title.innerHTML = tabtitle;

                document.getElementById('content').appendChild(title); 
                createdTabs.push(tabtitle);

                let content = document.createElement('div');
                content.classList.add('flex', 'flex-wrap', 'augment-holder');
                content.setAttribute('name', tabtitle);

                document.getElementById('content').appendChild(content);
                space = content;
            } else {
                space = document.getElementsByName(tabtitle)[0];
            }

            makeItemCard(augment, space);
        }

        for (let tab of createdTabs) {
            var item_count = document.createElement('a');
            item_count.innerHTML = document.getElementsByName(tab)[0].children.length + ' augments';
            item_count.classList.add('items-count');

            document.getElementById('title_' + tab).append(item_count);
        }

    }).catch(err => {
        console.error(err);
    })
}

function makeItemCard(item, parent) {
    let b = document.createElement('a');
    b.classList.add('item-card-parent');

    var card = document.createElement('div');
    card.classList.add('augment');
    card.classList.add('d-50-media');

    let left = document.createElement('div');

    var obj = document.createElement("div");
    obj.classList.add("item-card");
    obj.setAttribute('data-rarity', item.rarity.id);

    var title = document.createElement('span');
    title.innerHTML = item.name;
    title.classList.add("item-title");

    //card.appendChild(title);

    var img_obj = document.createElement("img");
    let ic = document.createElement('div');
    ic.classList.add("item-image");

    img_obj.src = item.icon;
    img_obj.setAttribute("title", item.name);

    ic.append(img_obj);

    obj.appendChild(ic);
    b.append(obj);

    left.appendChild(b);

    // end of image part

    let right = document.createElement("div");
    right.classList.add('predictions-item-context');

    let name = document.createElement("h2");
    name.innerHTML = item.name;
    name.classList.add('flex');
    name.classList.add('flex-wrap');

    let description = document.createElement("h3");
    description.innerHTML = item.description;

    let additionalDescription = document.createElement("a");
    additionalDescription.innerHTML = item.additionalDescription;

    let chance = parseFloat(trueRound(item.weight / augmentSum, 2));
    let rollChance = document.createElement("a");
    rollChance.innerHTML = 'Probability: ' + (chance * 100) + '%';

    right.appendChild(name);
    right.appendChild(description);
    right.appendChild(additionalDescription);
    right.appendChild(rollChance);

    card.appendChild(left);
    card.appendChild(right);
    parent.append(card);
}