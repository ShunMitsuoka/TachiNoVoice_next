import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Category } from 'villageType';

interface Props {
    categories: Category[];
    onClose:any;
    setSlectedCategoryId:any;
    slectedCategoryId:number;
}

export const CategorySideMenu: React.FC<Props> = ({
    categories,
    onClose,
    setSlectedCategoryId,
    slectedCategoryId
}) => {

    return (
        <div className="fixed top-0 left-0 h-full w-full z-10">
          <div className="absolute top-0 left-0 h-full w-full" onClick={onClose}>
          </div>
          <AnimatePresence>
            <motion.div 
                initial={{ x: 200, opacity: 0 }}
                animate={{ x:  0, opacity: 1 }}
                transition={{ duration: 0.2}}
                className=" absolute top-0 right-0 flex flex-col justify-center h-screen w-9/12 px-4 bg-main rounded-tl-full rounded-bl-full drop-shadow-lg"
            >
                {
                categories.map((category, index) => {
                    return (
                    <div key={index}>
                        {
                        category && category.opinions && category.opinions.length > 0 &&
                        <div
                            className={"px-3 py-2 mb-6 rounded-lg text-xl text-white drop-shadow-lg " + (category.category_id == slectedCategoryId ? "bg-rise" : "bg-gray-300")}
                            onClick={() => {
                            setSlectedCategoryId(category.category_id!);
                            onClose();
                            }}>
                            {category.category_name}
                        </div>
                        }
                    </div>
                    );
                })
                }
            </motion.div>
        </AnimatePresence>
        </div>
    )
}