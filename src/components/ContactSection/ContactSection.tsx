import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fade } from "react-awesome-reveal";

import arrow from "../../images/arrow-2.svg";

/* VALIDATION */
const schema = z.object({
    name: z.string().min(2, "Vui lòng nhập họ tên"),
    email: z.string().email("Email không hợp lệ"),
    phone: z.string().min(6, "Vui lòng nhập số điện thoại"),
    note: z.string().min(5, "Nội dung cần ít nhất 5 ký tự"),
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

        alert("Cảm ơn bạn! Tôi sẽ phản hồi sớm nhất.");

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
                                    <h3>Cùng nhau,</h3>
                                </div>

                                <div className="title-item">
                                    <p>
                                        <span>Biến ý tưởng của bạn</span> thành sản phẩm phần mềm thật
                                    </p>
                                    <h3>thepKz</h3>
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
                                                placeholder="Họ và tên *"
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
                                                placeholder="Số điện thoại *"
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
                                                placeholder="Nội dung dự án của bạn *"
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
                                                    <span>{isSubmitting ? "Đang gửi..." : "Gửi"}</span>
                                                    <span>{isSubmitting ? "Vui lòng chờ" : "liên hệ"}</span>
                                                </i>
                                            </button>

                                            <div className="submit-side-text">
                                                <p>
                                                    Khi gửi form này, bạn đồng ý với Chính sách bảo mật.
                                                    Thông tin cá nhân của bạn luôn được bảo vệ.
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