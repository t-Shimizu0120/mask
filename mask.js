const locationURL = location.href;
if (locationURL.includes('detail')) {

    const create_Element = (tagName,attributes) => {
        const add_Elm = document.createElement(tagName);
        for (attribute of attributes) {
            const attrName = Object.keys(attribute)[0]
            const attrValue = attribute[attrName]
            add_Elm.setAttribute(attrName,attrValue);
        };
        return add_Elm;
    };



    class AddTable {
        constructor (object,...args) {

            if(object.table_Contents.length === 0) {
                return null;
            } else {
                if (document.querySelector('.js-added-table') != null) {
                } else {
                    this.setStyle();
                };

                const obj = this.setAttrs(object);

                if (obj['contents_Title'] === '') {
                } else {
                    const table_Contents_Title = document.createElement('h5');
                    table_Contents_Title.textContent = obj['contents_Title'];
                };

                const add_Elm_table = document.createElement('table');
                for (this.table_Attr of obj.table_Attrs) {
                    const table_AttrName = Object.keys(this.table_Attr)[0];
                    const table_AttrValue = this.table_Attr[table_AttrName];
                    add_Elm_table.setAttribute(table_AttrName,table_AttrValue);
                };

                const add_Elm_tbody = document.createElement('tbody');

                for (this.tableRow of obj.table_Contents){
                    const add_Elm_tr = document.createElement('tr');
                    for (this.rowItem of this.tableRow) {
                        const items_KeyName = Object.keys(this.rowItem)[0];
                        if (items_KeyName === 'th') {
                            const add_Elm_th = document.createElement(items_KeyName);
                            const add_Elm_th_Value = this.rowItem[items_KeyName];
                            add_Elm_th.textContent = add_Elm_th_Value;
                            add_Elm_tr.appendChild(add_Elm_th);
                        } else if (items_KeyName === 'td') {
                            if (this.rowItem[items_KeyName].length === 0) {
                            } else {
                                const add_Elm_td = document.createElement(items_KeyName);
                                const ul = document.createElement('ul');
                                for(let i = 0; i < this.rowItem[items_KeyName].length; i++) {
                                    const li = document.createElement('li');
                                    li.textContent = this.rowItem[items_KeyName][i];
                                    ul.appendChild(li);
                                };
                                add_Elm_td.appendChild(ul);
                                add_Elm_tr.appendChild(add_Elm_td);
                            };
                        };
                    };
                    add_Elm_tbody.appendChild(add_Elm_tr);
                };
                const add_Elm_tr = document.createElement('tr');
                const add_Elm_th = document.createElement('th');
                const add_Elm_td = document.createElement('td');


                add_Elm_table.appendChild(add_Elm_tbody);

                if (obj.add_To_Selector === '') {
                    return add_Elm_table;
                } else {
                    const targetElm = document.querySelector(obj.add_To_Selector);
                    if (obj['contents_Title'] === '') {
                        targetElm.appendChild(add_Elm_table);
                    } else {
                        targetElm.appendChild(table_Contents_Title);
                        targetElm.appendChild(add_Elm_table);
                    };
                };
            };
        };
        setStyle() {
            const headElm = document.querySelector('head');
            const addStyleElm = document.createElement('style');
            const style = `
                .js-added-font-size {
                    font-size:1.2rem; 
                    color:#000;
                } 
                table {
                    width:100%;
                } 
                th {
                    background-color:#dddddd; 
                    color:#3f3f3f; 
                    font-weight:bold; 
                    text-align:center; 
                    vertical-align:middle;
                } 
                th, td {
                    border: 1px #3f3f3f solid; flex:1 3; padding:1.2rem 1.2rem;
                }
                #surrounding-information-table {
                    margin-top:10px;
                    margin-bottom:10px;
                }
            `;
            addStyleElm.textContent = style;
            headElm.appendChild(addStyleElm);
        };
        setAttrs(object) {
            const table_Obj = {
                contents_Title:'',
                table_Contents:[],

                table_Attrs:[{class:'js-added-table'}],
                tbody_Attrs:[],
                th_Attrs:[],
                td_Attrs:['js-added-font-size'],

                add_To_Selector:''
            };
            table_Obj.contents_Title = object.contents_Title;
            const table_Contents = object.table_Contents;
            for (this.table_Content of table_Contents) {
                table_Obj.table_Contents.push(this.table_Content);
            };
            const table_Id = object.table_Id;
            table_Obj.table_Attrs.push(table_Id);
            table_Obj.add_To_Selector = object.add_To_Selector;

            return table_Obj;
        };

    };

    const surroundingInformationRegex = /[（].+[）]/g;
    const surroundingList = ['柿生郵便局（郵便局）まで540m','ローソン（コンビニ）まで219m','セブンイレブン（コンビニ）まで1100m'];
    const surroundingInformationList = (() =>{
        const outputList = [];
        for(surroundingItem of surroundingList) {
            const targetText = surroundingItem.match(surroundingInformationRegex)[0];
            const category = targetText.replace('（','').replace('）','');
            const information = surroundingItem.replace(targetText,'');
            const surroundingObj = `■ ${category}：${information}`;
            outputList.push(surroundingObj);
        };
        return outputList;
    })(); 

    const tab_Content_SurroundingInformation = new AddTable(
        {
            contents_Title:'',
            table_Contents:[
                [
                    {th:'周辺施設'},
                    {td:surroundingInformationList}
                ]
            ],
            table_Id:{id:'surrounding-information-table'},
            add_To_Selector:''
        }
    );



    const tab_Content_Map = (() => {
        const map_Parent_Elm = create_Element('div',[
            {class:'tab-contents-item'},
            {id:'contents-item-map'}
        ]);

        const map_Address = document.querySelector('div.detail_r').querySelector('dl.clearfix').querySelector('dd').textContent;

        const map_Src = (() => {
            let m_src;
            if (window.screen.width <= 480) {
                m_src = 'https://www.google.com/maps/?output=embed&q=' + map_Address + '&t=m&z=15';
            } else if (window.screen.width > 480 && window.screen.width < 960) {
                m_src = 'https://www.google.com/maps/?output=embed&q=' + map_Address + '&t=m&z=16';
            } else {
                m_src = 'https://www.google.com/maps/?output=embed&q=' + map_Address + '&t=m&z=17';
            };
            return m_src;
        })(); 

        const map_Elm = create_Element('iframe',[
            {width:'100%'},
            {height:'auto'},
            {style:'border:0; position:absolute; top:-180px; left:0; width:100%; height:calc(100% + 180px + 180px);'},
            {loading:'lazy'},
            {allowfullscreen:''},
            {referrerpolicy:'no-referrer-when-downgrade'}
        ]);
        map_Elm.src = map_Src;

        map_Parent_Elm.appendChild(map_Elm);

        return map_Parent_Elm;
    })();



    class AddTabContents {

        constructor (object,...args) {

            if(object.tab_Contents.length === 0) {
                return null;
            } else {

                if (document.querySelector('.js-added-tab-list') != null) {
                } else {
                    this.setStyle(object);
                };

                const obj = this.setAttrs(object);

                const tab_Contents_Title = document.createElement('h5');
                tab_Contents_Title.textContent = obj['contents_Title'];

                const tab_Ul = document.createElement('ul');
                for (this.ul_Attr of obj.ul_Attrs) {
                    const ul_AttrName = Object.keys(this.ul_Attr)[0];
                    const ul_AttrValue = this.ul_Attr[ul_AttrName];
                    tab_Ul.setAttribute(ul_AttrName,ul_AttrValue);
                };
                for (let i = 0; i < obj.tab_Contents.length; i++) {
                    const tab_Li = document.createElement('li');
                    for (this.li_Attr of obj.li_Attrs) {
                        const li_AttrName = Object.keys(this.li_Attr)[0];
                        const li_AttrValue = this.li_Attr[li_AttrName];
                        tab_Li.setAttribute(li_AttrName,li_AttrValue);
                    };
                    tab_Li.textContent = obj.tab_Contents[i]['tabContentTitle'];
                    if (i === 0) {
                        for (this.class_First of obj.li_Class_First) {
                            tab_Li.classList.add(this.class_First);
                        };
                    } else {
                        for (this.class_Except of obj.li_Class_Except) {
                            tab_Li.classList.add(this.class_Except);
                        };
                    };
                    if(args[i] === null) {
                        tab_Li.classList.add('js-disabled');
                        for (this.class_Except of obj.li_Class_Except) {
                            tab_Li.classList.remove(this.class_Except);
                        };
                    } else {
                        tab_Li.addEventListener('click', (e) => this.clickHandler(e));
                    };
                    tab_Ul.appendChild(tab_Li);
                };
                const tab_Contents = document.createElement('div');
                for (this.contents_Attr of obj.contents_Attrs) {
                    const contents_AttrName = Object.keys(this.contents_Attr)[0];
                    const contents_AttrValue = this.contents_Attr[contents_AttrName];
                    tab_Contents.setAttribute(contents_AttrName,contents_AttrValue);
                };
                for (let i = 0; i < obj.tab_Contents.length; i++) {
                    const tab_Contents_Item = document.createElement('div');
                    for (this.contents_Item_Attr of obj.contents_Item_Attrs) {
                        const contents_Item_AttrName = Object.keys(this.contents_Item_Attr)[0];
                        const contents_Item_AttrValue = this.contents_Item_Attr[contents_Item_AttrName];
                        tab_Contents_Item.setAttribute(contents_Item_AttrName,contents_Item_AttrValue);
                    };
                    if (i === 0) {
                        for (this.class_First of obj.contents_Item_Class_First) {
                            tab_Contents_Item.classList.add(this.class_First);
                        };    
                    } else {
                        for (this.class_Except of obj.contents_Item_Class_Except) {
                            tab_Contents_Item.classList.add(this.class_Except);
                        };
                    };
                    if(args[i] === null) {
                    } else {
                        tab_Contents_Item.appendChild(args[i]);
                    };
                    tab_Contents.appendChild(tab_Contents_Item);
                };
                const add_tabContents = document.createElement('div');
                add_tabContents.setAttribute('class','js-added-tab');

                add_tabContents.appendChild(tab_Ul);
                add_tabContents.appendChild(tab_Contents);

                if (obj.add_To_Selector === '') {
                    return add_tabContents;
                } else {
                    const targetElm = document.querySelector(obj.add_To_Selector);
                    if (obj['contents_Title'] === '') {
                        targetElm.appendChild(add_tabContents);
                    } else {
                        targetElm.appendChild(tab_Contents_Title);
                        targetElm.appendChild(add_tabContents);
                    };
                };

            };
        };
        setStyle(object) {
            const headElm = document.querySelector('head');
            const addStyleElm = document.createElement('style');
            const tabCount = (() => {
                if (object['tab_Contents'].length <= 3) {
                    return 3;
                } else {
                    return object['tab_Contents'].length;
                };
            })();
            const aspectRatio = (() => {
                if (window.screen.width <= 480) {
                    return 75;
                } else if (window.screen.width > 480 && window.screen.width < 960){
                    return 75;
                } else {
                    return 66.667;
                };
            })();
            const tabWidthBase = Math.trunc((100 / Number(tabCount)) * 1000) / 1000;
            const style = `
                .js-added-tab {
                    width:100%;
                }
                .js-added-tab-list {
                    list-style-type:none; 
                    display:flex; 
                    flex-flow:row wrap; 
                    justify-content:space-btween;
                } 
                .js-added-tab-list-item {
                    text-align:center;
                    flex: 0 0 ${tabWidthBase}%; 
                    background-color:#dddddd; 
                    color:#3f3f3f; 
                    padding: 10px 0; 
                    font-weight:bold;
                } 
                .js-added-tab-list-item-valid {
                    cursor:pointer;
                } 
                .js-added-tab-list-item.active {
                    background-color:#3f3f3f; 
                    color:#eee;
                } 
                .js-added-h:hover {
                    opacity:.6;
                } 
                .js-disabled {
                    opacity:.6; 
                    pointer-events:none;
                } 
                .js-added-tab-contents-item {
                    display:none;
                } 
                .js-added-tab-contents-item.show {
                    display:block;
                } 
                #contents-item-map {
                    position:relative; 
                    padding-bottom:${aspectRatio}%; 
                    height:0; 
                    overflow:hidden;
                }
            `;
            addStyleElm.textContent = style;
            headElm.appendChild(addStyleElm);
        };
        setAttrs(object) {
            const tab_Obj = {
                contents_Title:'',
                tab_Contents:[],

                ul_Attrs:[{class:'js-added-tab-list'}],
                li_Attrs:[{class:'js-added-tab-list-item'}],
                li_Class_First:['active'],
                li_Class_Except:['js-added-tab-list-item-valid','js-added-h'],

                contents_Attrs:[{class:'js-added-tab-contents'}],
                contents_Item_Attrs:[{class:'js-added-tab-contents-item'}],
                contents_Item_Class_First:['show'],
                contents_Item_Class_Except:[],

                add_To_Selector:''
            };
            tab_Obj.contents_Title = object.contents_Title;
            const tab_Contents = object.tab_Contents;
            for (this.tab_Content of tab_Contents) {
                tab_Obj.tab_Contents.push(this.tab_Content);
            };
            const ul_Id = {};
            ul_Id.id = object.contents_BaseId + '-tabs';
            tab_Obj.ul_Attrs.push(ul_Id);
            const contents_Id = {};
            contents_Id.id = object.contents_BaseId + '-tab-contents';
            tab_Obj.contents_Attrs.push(contents_Id);
            tab_Obj.add_To_Selector = object.add_To_Selector;

            return tab_Obj;
        };
        clickHandler(e) {
            e.preventDefault();
            const targetTab = e.target;
            const parentId = targetTab.parentNode.getAttribute('id');
            const target_Contents_Id = parentId.replace(/tabs$/g,'tab-contents');
            const target_Contents_Parent = document.getElementById(target_Contents_Id);
            if (targetTab.className.includes('active')) {
            } else {
                targetTab.parentNode.querySelectorAll('.js-added-tab-list-item.active')[0].classList.remove('active');
                targetTab.classList.add('active');
                targetTab.classList.remove('js-added-tab-list-item-valid');
                targetTab.classList.remove('js-added-h');

                target_Contents_Parent.querySelectorAll('.js-added-tab-contents-item.show')[0].classList.remove('show');
                const aryTabs = Array.prototype.slice.call(targetTab.parentNode.children);
                const index = aryTabs.indexOf(targetTab);
                target_Contents_Parent.children[index].classList.add('show');
            };
            for(let i = 0; i < targetTab.parentNode.children.length; i++) {
                if (target_Contents_Parent.children[i].hasChildNodes() == true && targetTab.parentNode.children[i].className.includes('active') == false) {
                    targetTab.parentNode.children[i].classList.add('js-added-tab-list-item-valid');
                    targetTab.parentNode.children[i].classList.add('js-added-h');
                } else {
                };
            };
        };
    };


    const surroundingEnvironment = new AddTabContents(
        {
            contents_Title:'周辺概要',
            contents_BaseId:'surrounding-environment',
            tab_Contents:[
                {tabContentTitle:'周辺マップ'},
                {tabContentTitle:'周辺施設情報'}
           ],

            add_To_Selector:'div.detail_btm'
       },
       tab_Content_Map,
       tab_Content_SurroundingInformation
    );


} else if (locationURL.includes('property')) {
} else {
};




