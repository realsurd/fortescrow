import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaDollarSign,
  FaEthereum,
  FaEuroSign,
  FaInstagram,
  FaMinus,
  FaPlus,
  FaStar,
} from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { IoMdArrowDropdown } from 'react-icons/io';
import { LuArrowUpRight } from 'react-icons/lu';
import styles from './index.module.scss';
import Link from 'next/link';
import { cases, data, faqs, options, testimonials } from './mock';
import Marquee from 'react-fast-marquee';
import { RxHamburgerMenu } from "react-icons/rx";

export function LandingPage() {
  // const [activeDropDown, setActiveDropDown] = useState(false);
  // const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [checked, setChecked] = useState<number>(-1);
  const [selectedCards, setSelectedCards] = useState(testimonials.slice(0, 3));

  const prevBtn = () => {
    if (selectedCards[0] == testimonials[0]) {
      setSelectedCards(testimonials.slice(0, 3));
    } else {
      setSelectedCards(testimonials.slice(0, 3));
    }
  };
  const nextBtn = () => {
    if (
      selectedCards[selectedCards.length - 1] ==
      testimonials[testimonials.length - 1]
    ) {
      setSelectedCards(testimonials.slice(1, 4));
    } else {
      setSelectedCards(testimonials.slice(1, 4));
    }
  };

  const showToggle = (index: number) => {
    setChecked(index);
  };
  const closeToggle = () => {
    setChecked(-1);
  };

  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={styles['container']}>
       {openSideNav && (
          <div className={styles['mobile-side-nav']}>
            <header>
              <div className={styles['mobile-logo']}>
                <Link href={'/'} className={styles['link']}>
                  Fortescrow
                </Link>
              </div>
              <div
                className={styles['mobile-menu-bar']}
                onClick={() => setOpenSideNav(false)}
              >
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1710200265/menu-01_1_btjqaf.png"
                  alt="bar"
                />
              </div>
            </header>
            <div className={styles['nav-section']}>
              <div className={styles['nav-list']}>
                <Link className={styles['nav-item']} href="/">
                  About Us
                </Link>
                <Link className={styles['nav-item']} href="/">
                  Contact Us
                </Link>
                <Link className={styles['nav-item']} href="/login">
                  Login
                </Link>
                <Link className={styles['nav-item']} href="/signup">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      <div className={styles['hero-section']}>
        {!isMobile ? (
          <div className={styles['desktop-header']}>
            <Link className={styles['logo']} href={'/'}>
              ForteScrow
            </Link>
            <div className={styles['tabs']}>
              <Link className={styles['tab-active']} href={'/'}>
                Home
              </Link>
              <Link className={styles['tab']} href={'/'}>
                Careers
              </Link>
              <Link className={styles['tab']} href={'/'}>
                About
              </Link>
              <Link className={styles['tab']} href={'/'}>
                Security
              </Link>
            </div>

            <div className={styles['buttons']}>
              <Link className={styles['signup']} href={'/signup'}>
                Sign Up
              </Link>
              <Link className={styles['login']} href={'/login'}>
                Login
              </Link>
            </div>
          </div>
        ) : ( 
          <div className={styles['mobile-header']}>
            <Link className={styles['logo']} href={'/'}>
              ForteScrow
            </Link>
            <RxHamburgerMenu className={styles['menu-bar']} onClick={() => setOpenSideNav(true)}/>
          </div>
        )}
        <div className={styles['inner-hero']}>
          <div className={styles['left-container']}>
            <div className={styles['inner']}>
              <div className={styles['tag']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716051406/Icon_cop70k.png"
                  alt="tag"
                />
                Secure Escrow Services for Safe Transactions
              </div>
              <div className={styles['heading-text']}>
                Empowering Trust and Securing Transactions with{' '}
                <span>ForteScrow</span>
              </div>
              <div className={styles['body-text']}>
                Welcome to the future of secure transactions. With our advanced
                escrow services, your transactions are safeguarded, and your
                peace of mind is assured.
              </div>
            </div>
            <div className={styles['btn-container']}>
              <div className={styles['btn-get-started']}>get started</div>
              <div className={styles['btn-learn-more']}>learn more</div>
            </div>
          </div>
          <div className={styles['right-container']}>
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1715569235/Frame_1618868130_ovifvc.png"
              alt="hero-image"
            />
            <div className={styles['txn-container']}>
              <div className={styles['title']}>Your Transactions</div>
              <div className={styles['inner-content']}>
                {[1, 2, 3].map((item, index) => (
                  <div className={styles['card-container']} key={index}>
                    <div className={styles['card']}>
                      <div className={styles['left']}>
                        <div className={styles['icons']}>
                          <FaArrowLeft className={styles['icon']} />
                          <FaArrowRight className={styles['icon']} />
                        </div>
                        <div className={styles['info']}>
                          <div className={styles['lead']}>Transaction</div>
                          <div className={styles['user']}>John Kenley</div>
                        </div>
                      </div>
                      <div className={styles['amount']}>-$68.00</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles['currency-group']}>
          <div className={styles['text']}>Supported Currency</div>
          <div className={styles['group']}>
            <FaDollarSign className={styles['icon']} />
            <FaEuroSign className={styles['icon']} />
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1715807566/Shape_ob4j0s.png"
              alt="bitcoin"
            />
            <FaEthereum className={styles['icon']} />
          </div>
        </div>
      </div>
      {/* end of Hero section */}
      <div className={styles['partners']}>
        <div className={styles['top']}>
          <div className={styles['title']}>
            Our Trusted <span>Partners</span>
          </div>
          <div className={styles['body']}>
            Partnering with global comapanies to bring seamless transactions
            between Buyers and sellers.
          </div>
        </div>
        {true && (
          <Marquee>
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1715810311/Property_1_start_l6iubj.png"
              alt="marquee logo"
            />
          </Marquee>
        )}
      </div>
      {/* end of Partners section */}
      <div className={styles['how-it-works']}>
        <div className={styles['top']}>
          <div className={styles['title-line']}>
            <div className={styles['title']}>
              How <span>ForteScrow</span> works
            </div>
            <div className={styles['line']}></div>
            </div>
          <div className={styles['body']}>
            Real-time transaction tracking, and round-the-clock customer
            support, ensuring a hassle-free experience for all users.
          </div>
        </div>

        <div className={styles['cards']}>
          {data.map((item, index) => (
            <div className={styles['card']} key={index}>
              <img src={item.img} alt={item.type} />
              <div className={styles['content']}>
                <div className={styles['title']}>{item.type}</div>
                <div className={styles['body']}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* end of how it works section */}
      <div className={styles['use-cases']}>
        <div className={styles['top']}>
          <div className={styles['title-line']}>
            <div className={styles['title']}>
              Use <span>Cases</span>
            </div>
            <div className={styles['line']}></div>
          </div>
          <div className={styles['body']}>
            A neutral third party to mitigate the risk of fraud or non-delivery
            for buyers and sellers alike.
          </div>
        </div>
        <div className={styles['bottom']}>
          <div className={styles['left']}>
            <div className={styles['top']}>
              <div className={styles['title']}>Zero Fraud Worries!!!</div>
              <div className={styles['body']}>
                ForteScrow enhances security and trust in online marketplace
                transactions, providing a reliable solution for buyers and
                sellers alike.
              </div>
            </div>
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716055703/Frame_1618868172_tzxwck.png"
              alt="pics"
            />
          </div>
          <div className={styles['right']}>
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716064202/Abstract_Design_sfyhcl.png"
              alt="abstract"
              className={styles.abstract}
            />
            <div className={styles['cards']}>
              {cases.map((item, index) => (
                <div className={styles['card']} key={index}>
                  <img src={item.img} className={styles.img} alt={item.type} />
                  <div className={styles['title']}>{item.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* end of use cases section */}
      <div className={styles['why-choose-forte']}>
        {!isMobile && (
          <img
            src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716248116/Abstract_Design_yhn3av.png"
            alt="abstract"
            className={styles['abstract-img']}
          />
        )}
        <div className={styles['top']}>
          <div className={styles['title-line']}>
            <div className={styles['title']}>
              Why Choose <span>ForteScrow</span>
            </div>
            <div className={styles['line']}></div>
          </div>
          <div className={styles['body']}>
            Your Trusted Escrow Partner for peace of mind.
          </div>
        </div>
        <div className={styles['cards']}>
          {options.map((item, index) => (
            <div className={styles['card']} key={index}>
              <div className={styles['top']}>
                <div className={styles['title']}>{item.title}</div>
                <LuArrowUpRight className={styles['icon']} />
              </div>
              <div className={styles['body']}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
      {/* end of why choose forte section */}
      <div className={styles['faq']}>
        <div className={styles['top']}>
          <div className={styles['title']}>Frequently Asked Questions</div>
          <div className={styles['body']}>
            {`Find the answers to frequently asked questions, let's clear your
            doubts so that you can get started easily without any worries.`}
          </div>
        </div>
        <div className={styles['cards']}>
          {faqs.map((item, index) => (
            <div className={styles['card']} key={index}>
              <div className={styles['top']}>
                <div className={styles['title']}>{item.title}</div>
                {checked == index ? (
                  <FaMinus
                    className={styles['icon-close']}
                    onClick={() => closeToggle()}
                  />
                ) : (
                  <FaPlus
                    className={styles['icon-open']}
                    onClick={() => showToggle(index)}
                  />
                )}
              </div>
              {checked == index && (
                <div className={styles['body']}>{item.text}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* end of faq section */}
      <div className={styles['testimonials']}>
        <div className={styles['top']}>
          <div className={styles['title-line']}>
            <div className={styles['title']}>
              Our <span>Testimonials</span>
            </div>
            <div className={styles['line']}></div>
          </div>
          <div className={styles['body']}>
            {`Discover the experiences of our satisfied clients as they share stories of success, collaboration, and the transformative impact of choosing Apex`}
          </div>
        </div>
        <div className={styles['cards']}>
          {
            !isMobile ? (
              selectedCards.map((item, index) => (
                <div className={styles['card']} key={index}>
                  <img
                    src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716248471/Text_fqjthi.png"
                    alt="quote"
                    className={styles['quote']}
                  />
                  <div className={styles['top']}>
                    <div className={styles['left']}>
                      <img src={item.img} alt="avatar" />
                      <div className={styles['info']}>
                        <div className={styles['name']}>{item.name}</div>
                        <div className={styles['title']}>{item.title}</div>
                      </div>
                    </div>
                    <div className={styles['right']}>
                      {[1, 2, 3, 4, 5].map((item, index) => (
                        <FaStar key={index} className={styles['star']} />
                      ))}
                    </div>
                  </div>
                  <div className={styles['body']}>{item.text}</div>
                  <div className={styles['read-more']}>
                    Read More
                    <FaArrowRight className={styles['icon']} />
                  </div>
                </div>
              ))
            ):(
              <div className={styles['mobile-card']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716248471/Text_fqjthi.png"
                  alt="quote"
                  className={styles['quote']}
                />
                <div className={styles['top']}>
                  <div className={styles['left']}>
                    <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716248132/Image_1_ety96j.png" alt="avatar" />
                    <div className={styles['info']}>
                      <div className={styles['name']}>Sarah Johnson</div>
                      <div className={styles['title']}>CEO Boutique</div>
                    </div>
                  </div>
                  <div className={styles['right']}>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                      <FaStar key={index} className={styles['star']} />
                    ))}
                  </div>
                </div>
                <div className={styles['body']}>{`"As a seller, ForteScrow has been a game-changer for me. I no longer have to deal with the stress of fraudulent buyers or chargebacks."`}</div>
                <div className={styles['read-more']}>
                  Read More
                  <FaArrowRight className={styles['icon']} />
                </div>
              </div>
            )
          }
        </div>
        <FaArrowLeft className={styles.btnleft} onClick={() => prevBtn()} />
        <FaArrowRight className={styles.btnright} onClick={() => nextBtn()} />
      </div>
      {/* end of testimonials section */}
      <div className={styles['worries']}>
        <div className={styles['text-container']}>
          <div className={styles['title']}>
            End fraudulent worries, start using <span>ForteScrow today!</span>
          </div>
          <div className={styles['body']}>
            Ready to take control of your finances? Join ForteScrow now, and let
            us help you achieve your financial goals with our tailored solutions
            and exceptional customer service
          </div>
        </div>
        <button className={styles['btn']}>Open Account</button>
      </div>
      {/* end of worries section */}
      <div className={styles['footer']}>
        <div className={styles['top']}>
          <div className={styles['left']}>
            <Link href={'/'} className={styles['link']}>
              ForteScrow
            </Link>
            <div className={styles['text']}>
              Secure Escrow Services for Safe Transactions
            </div>
            <div className={styles['group']}>
              <div className={styles['block']}>
                <FaXTwitter />
              </div>
              <div className={styles['block']}>
                <FiFacebook />
              </div>
              <div className={styles['block']}>
                <FaInstagram />
              </div>
            </div>
          </div>
          <div className={styles['right']}>
            <div className={styles['group-link']}>
              <div className={styles['title']}>Footer Link</div>
              <div className={styles['links']}>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
              </div>
            </div>
            <div className={styles['group-link']}>
              <div className={styles['title']}>Footer Link</div>
              <div className={styles['links']}>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
              </div>
            </div>
            <div className={styles['group-link']}>
              <div className={styles['title']}>Footer Link</div>
              <div className={styles['links']}>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
                <Link href={'/'} className={styles['link']}>
                  Footer Link
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['bottom']}>
          <div className={styles['left']}>
            @2024 ForteScrow. All Rights Reserved
          </div>
          <div className={styles['right']}>
            English
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716252475/Image_3_iqz0qw.png"
              alt="language"
            />
            <IoMdArrowDropdown className={styles['icon']} />
          </div>
        </div>
      </div>
      {/* end of footer section */}
    </div>
  );
}
