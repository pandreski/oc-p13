import FeatureBlock from '../components/FeatureBlock';
import HeroBanner from '../components/HeroBanner';
import { v4 as uuidv4 } from 'uuid';
import style from './Home.module.scss';
import chatIcon from '../assets/images/icon-chat.png';
import moneyIcon from '../assets/images/icon-money.png';
import securityIcon from '../assets/images/icon-security.png';

function Home() {
  const featuresData = [
    {
      icon: chatIcon,
      title: "You are our #1 priority",
      text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      icon: moneyIcon,
      title: "More savings means higher rates",
      text: "The more you save with us, the higher your interest rate will be!",
    },
    {
      icon: securityIcon,
      title: "Security you can trust",
      text: "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];

  return (
    <main>
      <HeroBanner />
      <div className={style.features}>
        <h2 className="sr-only">Features</h2>
        {featuresData.map((feature) => (
          <FeatureBlock
            key={uuidv4()}
            icon={feature.icon}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </div>
    </main>
  );
}

export default Home;
