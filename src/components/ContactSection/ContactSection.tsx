import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fade } from "react-awesome-reveal";

import arrow from "../../images/arrow-2.svg";

/* VALIDATION */
const schema = z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(6, "Phone number is required"),
    note: z.string().min(5, "Message must be at least 5 characters"),
});

type FormData = z.infer<typeof schema>;

const ContactSection: React.FC = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);

        // simulate API
        await new Promise((res) => setTimeout(res, 1200));

        alert("Thank you");

        reset();
    };

    return (
        <section className="wpo-contact-section" id="contact">

            <div className="container">

                <Fade direction="up" delay={150} triggerOnce>
                    <div className="wpo-contact-wrap">

                        <div className="wpo-contact-form-area">

                            {/* TITLE */}
                            <div className="contact-title">
                                <div className="title-top">
                                    <h3>Light, Camera,</h3>
                                </div>

                                <div className="title-item">
                                    <p>
                                        <span>Turning real moments</span> into beautifully captured memories
                                    </p>
                                    <h3>Shooote</h3>
                                </div>
                            </div>

                            {/* FORM */}
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="contact-validation-active"
                                id="contact-form-main"
                            >

                                <div className="row">

                                    {/* NAME */}
                                    <div className="col col-lg-6 col-md-6 col-12">
                                        <div className="input-item">
                                            <input
                                                {...register("name")}
                                                className="form-control"
                                                placeholder="Full name *"
                                            />
                                            {errors.name && (
                                                <p className="error">{errors.name.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* EMAIL */}
                                    <div className="col col-lg-6 col-md-6 col-12">
                                        <div className="input-item">
                                            <input
                                                {...register("email")}
                                                className="form-control"
                                                placeholder="Email *"
                                            />
                                            {errors.email && (
                                                <p className="error">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* PHONE */}
                                    <div className="col col-lg-12 col-md-12 col-12">
                                        <div className="input-item">
                                            <input
                                                {...register("phone")}
                                                className="form-control"
                                                placeholder="Phone number *"
                                            />
                                            {errors.phone && (
                                                <p className="error">{errors.phone.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* MESSAGE */}
                                    <div className="col col-lg-12 col-md-12 col-12">
                                        <div className="input-item">
                                            <textarea
                                                {...register("note")}
                                                className="form-control"
                                                placeholder="Your comment *"
                                            />
                                            {errors.note && (
                                                <p className="error">{errors.note.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* SUBMIT */}
                                    <div className="col col-lg-12 col-md-12 col-12">
                                        <div className="submit-area">

                                            <button
                                                type="submit"
                                                className="theme-btn"
                                                disabled={isSubmitting}
                                            >
                                                <i className="icon">
                                                    <img src={arrow} alt="" />
                                                </i>

                                                <i className="link-text">
                                                    <span>{isSubmitting ? "Sending..." : "Send"}</span>
                                                    <span>{isSubmitting ? "Please wait" : "my message"}</span>
                                                </i>
                                            </button>

                                            <div className="submit-side-text">
                                                <p>
                                                    Sending this form means you accept our Privacy Policy.
                                                    We ensure your personal details are protected
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </form>

                        </div>

                    </div>
                </Fade>


            </div>

        </section>
    );
};

export default ContactSection;