module.exports.members = [
    {
        firstName: "LazaroAlejandro",
        lastName: "Martinez",
        contract: {
            fol: "1fol1"
        },
        createdAt: "2019-11-26 02:35:25",
        status: "processable",
        clubDoc: {
            name: "clubname"
        }
    },
    {
        firstName: "Este esta descartado",
        lastName: "Totalmente",
        discarded: {
            status: true
        },
        contract: {
            fol: "2fol2"
        },
        createdAt: "2020-01-20 09:25:19",
        status: "processable",
        clubDoc: {
            name: "Monte Rey"
        },
        tutorials: []
    },
    {
        firstName: "Alberto",
        lastName: "Suares Albares",
        contract: {
            fol: "2fol2"
        },
        createdAt: "2020-01-21 09:25:19",
        status: "processable",
        clubDoc: {
            name: "Monte Rey"
        },
        tutorials: []
    },
    {
        firstName: "Jorge",
        lastName: "Perez Sosa",
        contract: {
            fol: "6fol4"
        },
        createdAt: "2020/01/20",
        status: "processable",
        clubDoc: {
            name: "Monte Rey"
        }
    },
    {},
    {
        firstName: "Lasaro",
        lastName: "Ernandez Lopez",
        contract: {},
        createdAt: "2020/01/21",
        status: "processable",
        clubDoc: {
            name: "Monte Rey"
        },
        tutorials: [
        ]
    }
]


module.exports.badMembers = [
    {
        firstName: "Jorge",
        lastName: "Perez Sosa",
        contract: {
            fol: "MTVR000011"
        },
        createdAt: "2019/11/15",
        clubDoc: {
            name: "Monte Rey"
        }
    },
    {},
    {
        firstName: "Lasaro",
        lastName: "Ernandez Lopez",
        contract: {},
        createdAt: "2020/01/20",
        clubDoc: {
            name: "Monte Rey"
        }
    }
]


module.exports.badElements = [
    {
        name: "FirstName LastName",
        contract: "No. Contract",
        date: "0000/00/00",
        club: "Club Doc 1"
    },
    {
        name: "FirstName LastName",
        contract: "Not Contract",
        date: "0000/00/00",
        club: "Club Doc 2"
    }
]


module.exports.goodElements = [
    {
        name: "First Correct Name",
        contract: "23ni23d35n",
        date: "0000/00/00",
        club: "First Club Doc"
    },
    {
        name: "Second Correct Name",
        contract: "0i09iud33uf",
        date: "0000/00/00",
        club: "Second Club Doc"
    },
    {
        name: "Third Correct Name",
        contract: "i8yws33edw",
        date: "0000/00/00",
        club: "Third Club Doc"
    }
]