Webová aplikace, která bude sloužit jako místo na uložení stavu bitvy a charakterů v D&D kampani
Hlavní využití bude pro DM kampaně, protože na postavách jsou lze vidět některé statistiky, které by mohli zvýhodnit hráče

Aplikace využivá ReactFlow nodes pro lokace a statistiky postav (např. životy)
Tyto nodes budou ukládány do local storage

Jako postavy lze najít vlastní / hráčskou postavu a dále mostra z D&D

V aplikaci si prvně uživatel přídá postavy s tlačítkem Add Entity a vybere typ
Potom co přidá všechny potřebné postavy je může samostatně editovat
Jakmile uživatel naedituje všechny potřebné informace pro entity může začít bitva
Pořadí se odvádí od initiative a entita, která právě hraje je zvýrazněná modrou barvou okolo
Jak se bude bitva vyvýjet může DM měnit životy hráčů a moster
Pokud entita zemře, je možné entitu odstranit

K získání informaci o mostrách z D&D se používá 5etools api edice roku 2014 (https://5e-bits.github.io/docs/)

K získání informaci byl použit endpoint https://www.dnd5eapi.co/api/2014/monsters, ze kterého potom vznikají další pro samostatné mostra

Projekt by dál mohl být rozvinut aby byly různé adresy pro hráče a DM např. /dm nebo /players