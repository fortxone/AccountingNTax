"use client";

import { MenuCloseIcon, MenuIcon } from "@/components/ui/icons";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/ShadCnDrawer";

interface WebDrawerProps {
    children?: React.ReactNode;
}

const WebDrawer = ({ children }: WebDrawerProps) => {
    return (
        <>
            {/* Drawer Trigger Button */}
            <Drawer direction="left">
                <DrawerTrigger asChild>
                    <button className="p-2" aria-label="Open menu">
                        <MenuIcon color="white" />
                    </button>
                </DrawerTrigger>

                {/* Drawer Content */}
                <DrawerContent className="h-full w-full max-w-none bg-[#0F2545] rounded-none border-none">
                    <DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
                    <div
                        className="relative h-full w-full flex flex-col"
                    >
                        {/* Close Icon - Top Right */}
                        <div className="absolute top-[57px] right-[34px] z-10">
                            <DrawerClose asChild>
                                <button className="bg-transparent color-white p-2" aria-label="Close menu">
                                    <MenuCloseIcon color="white" />
                                </button>
                            </DrawerClose>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col pt-16 pb-8 px-6">
                            {children}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default WebDrawer;
