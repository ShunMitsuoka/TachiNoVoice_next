export const appConst = {
    user : {
        gender : {
            man : 1,
            woman : 2,
            LGBT : 3,
        }
    },
    member : {
        role : {
            host : 1,
            villageMember : 10,
            coreMember : 20,
            riseMember : 30,
        }
    },
    village : {
        phase : {
            recruitmentOfMember : 1,
            drawingCoreMember : 2,
            askingOpinionsOfCoreMember : 3,
            categorizeOpinions : 4,
            askingOpinionsOfRiseMember : 5,
            evaluation : 6,
            decidingPolicy : 7,
            surveyingSatisfaction : 8,
        },
        category : {
            uncategorized : 0,
        },
        evaluation : {
            good : 1,
            bad : 50,
            uncertain : 100,
        }
    },
}