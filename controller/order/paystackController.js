import axios from "axios";

// Paystack Secret Key from environment variables
const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

// Initialize Payment
export const initializePayment = async (req, res) => {
  try {
    const { email, amount } = req.body;

    // Validate input
    if (!email || !amount) {
      return res.status(400).json({ message: "Email and amount are required" });
    }

    const url = "https://api.paystack.co/transaction/initialize";
    const response = await axios.post(
      url,
      { email, amount: amount * 100 }, // Paystack accepts amount in kobo
      { headers: { Authorization: `Bearer ${paystackSecretKey}` } }
    );

    res.status(200).json({ message: "Payment initialized", data: response.data });
  } catch (error) {
    res.status(500).json({ message: "Payment initialization failed", error: error.message });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    const params = {
        submit_type : 'pay',
        mode : 'payment'
        
    }

    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${paystackSecretKey}` },
    });

    res.status(200).json({ message: "Payment verified", data: response.data });
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};
