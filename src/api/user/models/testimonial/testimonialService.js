const TestimonialModel = require('./testimonialModel');
const UserModel = require('../../userModel');
const UserService = require('../../userService');

const LOG = "Testimonial Service";
class TestimonialService {
  static list = async () => {
    return TestimonialModel.find();
  }

  static show = async (filter) => {
    return TestimonialModel.findOne(filter);
  }

  static showByUser = async (userId) => {
    const user = await UserService.show(userId);
    return user.testimonials;
  }

  static create = async (userId, data) => {
    let newTestimonial = new TestimonialModel(data);
    await UserService.addData(userId, {testimonials: newTestimonial._id});
    return newTestimonial.save();
  }

  static remove = async (userId, _id) => {
    try{
      const testimonial = await TestimonialModel.deleteOne({_id});
      await UserService.removeData(userId, {testimonials: _id});
      return testimonial.deletedCount > 0;
    } catch(e){
      console.log(e);
      return null;
    }
  }

  static update = async (id, body) => {
    return TestimonialModel.findByIdAndUpdate(id, body, {new: true});
  }
}


module.exports = TestimonialService;
