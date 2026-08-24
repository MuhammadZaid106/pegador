import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { megaMenuByNav, type MenuLink } from "./menuData";
import { isExternalLink } from "@/utils/link";

type MegaMenuProps = {
  activeMenu: string | null;
  onLinkClick?: () => void;
};


const MenuAnchor = ({
  link,
  onLinkClick,
}: {
  link: MenuLink;
  onLinkClick?: () => void;
}) => {
  const external = isExternalLink(link.href);

  return (
    <Link
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={onLinkClick}
      className="block text-[12px] leading-tight text-[#101116] transition-opacity hover:opacity-70"
    >
      {link.label}
    </Link>
  );
};

const MegaMenu = ({ activeMenu, onLinkClick }: MegaMenuProps) => {
  const menu = activeMenu ? megaMenuByNav[activeMenu] : undefined;
  const isFireMenu = activeMenu === "FIRE";

  const columnsGridClass = menu?.imageCards?.length
    ? "sm:grid-cols-2 lg:grid-cols-3"
    : "sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6";

  return (
    <AnimatePresence mode="wait">
      {activeMenu && menu ? (
        <motion.div
          key={activeMenu}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="mt-10 border-t border-black/10 bg-white pb-10 pt-7 max-h-[60vh] overflow-y-auto mega-menu-scroll"
        >
          <motion.div
            className="mx-auto grid w-full max-w-screen-2xl gap-10 px-4 sm:px-8 lg:grid-cols-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.045, delayChildren: 0.06 },
              },
            }}
          >
            <div
              className={`grid gap-10  ${menu.imageCards?.length ? "lg:col-span-7" : "lg:col-span-12"} ${columnsGridClass}`}
            >
              {menu.columns.map((column) => (
                <motion.div
                  key={column.title}
                  className="min-w-0 space-y-4"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <h3 className="text-[12px] font-medium tracking-[0.14em] text-[#2c3340]">
                    {column.title}
                  </h3>
                  <div className="space-y-3">
                    {column.links.map((link) => (
                      <MenuAnchor
                        key={`${column.title}-${link.label}`}
                        link={link}
                        onLinkClick={onLinkClick}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {menu.imageCards && menu.imageCards.length > 0 ? (
              <motion.div
                className={`grid gap-6 ${
                  menu.imageCards.length > 1
                    ? "sm:grid-cols-2 lg:col-span-5"
                    : isFireMenu
                      ? "lg:col-span-4"
                      : "lg:col-span-5"
                }`}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {menu.imageCards.map((card) => (
                  <Link
                    key={card.src}
                    href={card.href}
                    onClick={onLinkClick}
                    className="group block"
                  >
                    <div
                      className={`relative overflow-hidden bg-neutral-100 ${
                        isFireMenu && menu.imageCards?.length === 1
                          ? "mx-auto h-80 w-full max-w-xs"
                          : "aspect-3/4"
                      }`}
                    >
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="pt-3 text-center text-base text-[#111] sm:text-lg">
                      {card.caption}
                    </p>
                  </Link>
                ))}
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default MegaMenu;
