import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './style';
import AppHeader from '../../Components/Header';
import { ScrollView } from 'react-native-gesture-handler';

export default function Privacy() {
  const rules = [
    {
      title: '1. Information We Collect',
      subTitle: 'We collect the following types of information:',
      content: ['- Personal Information: When you place an order or register an account, we may collect personal details such as your name, email address, phone number, and delivery address.',
        '- Payment Information: When you make a purchase, we collect payment information such as credit card details or other payment methods.',
        '- Cookies and Usage Data: We use cookies to enhance your experience on our website. Cookies are small data files that are placed on your device. We may also collect usage data such as IP address, browser type, and pages visited.'
      ],
    },
    {
      title: '2. How We Use Your Information',
      subTitle: 'We use the information we collect to:',
      content: ['- Process your orders and payments.',
        '- Deliver your bouquets to the correct location.',
        '- Send order confirmations, updates, and other communications related to your purchase.',
        '- Improve our website, services, and customer experience.',
        '- Send marketing and promotional materials, if you have opted in.'
      ],
    },
    {
      title: '3. Sharing Your Information',
      subTitle: 'We do not share your personal information with third parties except:',
      content: ['- Service Providers: We may share your information with trusted service providers who help us operate our business (e.g., delivery services, payment processors).',
        '- Legal Requirements: We may disclose your information if required by law or to protect our legal rights.',
      ],
    },
    {
      title: '4. Data Security',
      subTitle: 'We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure, so we cannot guarantee absolute security.',
      content: [''],
    },
    {
      title: '5. Your Rights',
      subTitle: 'You have the right to:',
      content: ['- Access, update, or delete your personal information.',
        '- Opt-out of receiving marketing communications from us.',
        '- Request that we stop using your personal data for specific purposes.',
        '- To exercise any of these rights, please contact us at [Contact Information].',
      ],
    },
    {
      title: '6. Changes to This Policy',
      subTitle: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.',
      content: [''],
    },
    {
      title: '7. Contact Us',
      subTitle: 'If you have any questions or concerns about this Privacy Policy, please contact us at:',
      content: [
        '- Bloomify',
        '- Blomify@gmail.com',
        '- +201066787955',
        '- 123 Street 256 House tanta',
      ],
    },
  ]
  return (
    <>
      <AppHeader title="Privacy Policy" arrowBack={true} />
      <ScrollView style={styles.container}>
        <Text style={styles.txt}>At < Text style={styles.brnd}> Bloomify</Text>, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.
        </Text>
        
          {rules.map((item,index)=><View key={index} style={styles.point}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>
            {
              item.content.map((data,index)=><Text style={styles.contnt} key={index}>
                {data}
              </Text>)
            }
          </View>
            )
          }
      </ScrollView>
    </>
  );
}
