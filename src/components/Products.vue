<template>
  <div style="margin-top: 40px; text-align: left">
    <input type="text" placeholder="Tên sản phẩm" v-model="key.name" @keyup.enter="search" style="width: 170px">
    <input type="number" placeholder="Giá nhỏ nhất" v-model="key.priceMin" @keyup.enter="search" style="width: 170px">
    <input type="number" placeholder="Giá lớn nhất" v-model="key.priceMax" @keyup.enter="search" style="width: 170px">
    <input type="text" placeholder="Danh mục" v-model="key.category" @keyup.enter="search" style="width: 170px">
    <button class="btn btn-info" @click="search" style="margin-left: 50px; width: 100px">Tìm kiếm</button>
    <button class="btn btn-info" @click="resetSearch" style="margin-left: 10px; width: 100px">Xoá</button>


    <button
        type="button" class="btn btn-info"
        data-toggle="modal" data-target="#create" style="margin-left: 800px" @click="resetForm"> Tạo mới
    </button>
  </div>

  <!--TABLE-->

  <table id="user-list-table" class="table table-bordered table-hover">
    <thead class="table-dark">
    <tr style="text-align: center">
      <th>#</th>
      <th>Name</th>
      <th>Giá</th>
      <th>Mô tả</th>
      <th style="width: 150px">Danh mục</th>
      <th style="width: 150px">Số lượng</th>
      <th style="width: 150px">Ngày tạo</th>
      <th style="width: 150px">Chỉnh sửa cuối</th>
      <th colspan="2" style="width: 120px">Trạng thái</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(product, index) in result" :key="index">
      <td>{{ index + 1 }}</td>
      <td style="width: 400px">{{ product.name }}</td>
      <td>{{ product.price }}</td>
      <td>{{ product.description }}</td>
      <td>{{ product.category }}</td>
      <td style="text-align: center">{{ product.quantity }}</td>
      <td style="text-align: center">{{ getDate(product.createTime) }}</td>
      <td style="text-align: center">{{ getDate(product.updateTime) }}</td>
      <td style="width: 80px; text-align: center">
        <button class="btn btn-info" type="button" style="width: 80px"
                data-toggle="modal" data-target="#edit"
                @click="getById(product.productId)">Edit
        </button>
      </td>
      <td style="width: 80px; text-align: center">
        <button class="btn btn-danger" type="button" style="width: 80px" @click="deleteProduct(product.productId)">
          Delete
        </button>
      </td>
    </tr>
    </tbody>
  </table>

  <div style="text-align: right; margin-right: 10px">
    <button class="btn btn-primary" style="margin-right: 10px" @click="selectPage1" v-show="isShowPageDown">1</button>
    <button class="btn btn-primary" @click="pageDown" v-show="isShowPageDown">«</button>
    <span>Trang </span><span>{{ page + 1 }}</span>
    <button class="btn btn-primary" @click="pageUp" v-show="isShowPageUp">»</button>
    <button class="btn btn-primary" @click="selectPageCuoi" v-show="isShowPageUp">{{ totalPage }}</button>
  </div>

  <!--TABLE-->


  <!--  MODAL CREATE-->

  <div class="modal fade" id="create" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1"><b>Tạo mới sản phẩm</b></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <form>
            <div class="modal-body">

              <div class="form-group">
                <span class="form-label"><b>Tên sản phẩm</b></span>
                <input class="form-control"
                       type="text"
                       v-model="product.name"
                       @blur="validate_name()"
                       v-bind:class="{'is-invalid': errors.name}">
                <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
              </div>

              <div class="form-group">
                <span class="form-label"><b>Giá sản phẩm</b></span>
                <input class="form-control" type="number" v-model="product.price"
                       @blur="validate_price()"
                       v-bind:class="{'is-invalid': errors.price}">
                <div class="invalid-feedback" v-if="errors.price">{{ errors.price }}</div>
              </div>

              <div class="form-group">
                <span class="form-label"><b>Mô tả sản phẩm</b></span>
                <input class="form-control" type="text" v-model="product.description"
                       @blur="validate_description()"
                       v-bind:class="{'is-invalid': errors.description}">
                <div class="invalid-feedback" v-if="errors.description">{{ errors.description }}</div>
              </div>

              <div class="form-group">
                <span class="form-label"><b>Danh mục</b></span>
                <select v-model="product.category" class="form-control">
                  <option disabled value="">Chọn danh mục</option>
                  <option v-for="(category, index) in resultListCategory" :key="index"
                          v-bind:value="category.name"

                          @blur="validate_category()"
                          v-bind:class="{'is-invalid': errors.category}"> {{ category.name }}
                  </option>
                </select>

                <div class="invalid-feedback" v-if="errors.category">{{ errors.category }}</div>
              </div>

              <div class="form-group">
                <span class="form-label"><b>Số lượng</b></span>
                <input class="form-control" type="number" v-model="product.quantity"
                       @blur="validate_quantity()"
                       v-bind:class="{'is-invalid': errors.quantity}">
                <div class="invalid-feedback" v-if="errors.quantity">{{ errors.quantity }}</div>
              </div>


            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetForm">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="saveCreate">Tạo mới</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!--  MODAL CREATE-->


  <!--  MODAL EDIT-->

  <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1"><b>Chỉnh sửa sản phẩm</b></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <form>
            <div class="modal-body">

              <div class="form-group">
                <span class="form-label"><b>Tên sản phẩm</b></span>
                <input class="form-control"
                       type="text"
                       v-model="product.name"
                       @blur="validate_name()"
                       v-bind:class="{'is-invalid': errors.name}">
                <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
              </div>

              <div class="form-group">
                <span class="form-label"><b>Giá sản phẩm</b></span>
                <input class="form-control" type="number" v-model="product.price"
                       @blur="validate_price()"
                       v-bind:class="{'is-invalid': errors.price}">
                <div class="invalid-feedback" v-if="errors.price">{{ errors.price }}</div>
              </div>

              <div class="form-group">
                <span class="form-label"><b>Mô tả sản phẩm</b></span>
                <input class="form-control" type="text" v-model="product.description"
                       @blur="validate_description()"
                       v-bind:class="{'is-invalid': errors.description}">
                <div class="invalid-feedback" v-if="errors.description">{{ errors.description }}</div>
              </div>

              <div class="form-group">
                <span class="form-label"><b>Danh mục</b></span>
                <select v-model="product.category" class="form-control">
                  <option disabled value="">Chọn danh mục</option>
                  <option v-for="(category, index) in resultListCategory" :key="index"
                          v-bind:value="category.name"
                          @blur="validate_category()"
                          v-bind:class="{'is-invalid': errors.category}"> {{ category.name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <span class="form-label"><b>Số lượng</b></span>
                <input class="form-control" type="number" v-model="product.quantity"
                       @blur="validate_quantity()"
                       v-bind:class="{'is-invalid': errors.quantity}">
                <div class="invalid-feedback" v-if="errors.quantity">{{ errors.quantity }}</div>
              </div>

            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetForm">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="saveEdit">Chỉnh sửa</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!--  MODAL EDIT-->

</template>

<script>
import axios from 'axios'
import moment from 'moment'


export default {

  name: 'Products',
  data() {
    return {
      errors: {
        name: '',
        price: '',
        description: '',
        category: '',
        quantity: ''
      },
      product: {
        name: '',
        price: '',
        description: '',
        category: '',
        quantity: ''
      },
      key: {
        name: '',
        category: '',
        priceMax: '',
        priceMin: ''
      },
      result: [],
      resultListCategory: [],
      idProduct: '',
      page: 0,
      size: 20,
      totalPage: '',
      isShowPageDown: false,
      isShowPageUp: true,


    }
  },


  async created() {
    this.search()
    this.getAllCategory()
  },


  methods: {
    validate_name() {
      this.errors.name = ''
      if (!this.product.name) {
        this.errors.name = 'Tên sản phẩm không được để trống'
        return false
      }
      return true
    },


    validate_price() {
      this.errors.price = ''
      if (!this.product.price) {
        this.errors.price = 'Giá sản phẩm không được để trống'
        return false
      }
      if (this.product.price < 0) {
        this.errors.price = 'Giá sản phẩm không được âm'
        return false
      }
      return true
    },


    validate_description() {
      this.errors.description = ''
      if (!this.product.description) {
        this.errors.description = 'Mô tả sản phẩm không được để trống'
        return false
      }
      return true
    },

    validate_category() {
      this.errors.category = ''
      if (!this.product.category) {
        this.errors.category = 'Danh mục sản phẩm không được để trống'
        return false
      }
      return true
    },

    validate_quantity() {
      this.errors.quantity = ''
      if (!this.product.quantity) {
        this.errors.quantity = 'Số lượng sản phẩm không được để trống'
        return false;
      }
      if (this.product.quantity < 0) {
        this.errors.quantity = 'Số lượng sản phẩm không được âm'
        return false;
      }
      if (this.product.quantity > 1000) {
        this.errors.quantity = 'Số lượng sản phẩm không được lớn hơn 1000'
        return false;
      }
      return true
    },

    validate() {
      if (!this.validate_name() ||
          !this.validate_price() ||
          !this.validate_description() ||
          !this.validate_category() ||
          !this.validate_quantity()
      )
        return false
      return true
    },


    getDate: function (date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    },

    search() {
      axios.get("http://localhost:8051/swagger-resources/products/search", {
        params: {
          name: this.key.name,
          category: this.key.category,
          priceMax: this.key.priceMax,
          priceMin: this.key.priceMin,
          page: this.page,
          size: 10
        }
      }).then(res => {
        this.result = res.data.result
        this.totalPage = res.data.totalPages
        this.showViewpage()
      });
    },


    getById(id) {
      axios.get("http://localhost:8051/swagger-resources/products/" + id
      ).then(res => {
        this.product = {
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
          category: res.data.category,
          quantity: res.data.quantity
        }
        this.idProduct = id
      });
    },

    getAllCategory() {
      axios.get("http://localhost:8051/swagger-resources/categories/"
      ).then(res => {
        this.resultListCategory = res.data
      });
    },

    resetSearch() {
      this.key = {
        name: '',
        category: '',
        priceMax: '',
        priceMin: ''
      }
      this.search()
    },

    resetForm() {
      this.product = {
        name: '',
        price: '',
        description: '',
        category: '',
        quantity: ''
      }
      this.errors = {
        name: '',
        price: '',
        description: '',
        category: '',
        quantity: ''
      }
    },


    saveCreate() {
      if (this.validate()) {
        axios.post("http://localhost:8051/swagger-resources/products/create", this.product
        ).then(res => {
          this.showMessage('success', 'Create!', 'Tạo mới thành công')
          this.search()
          this.resetForm()
        });
      }
    },

    saveEdit() {
      if (this.validate()) {
        axios.put("http://localhost:8051/swagger-resources/products/edit/" + this.idProduct, this.product
        ).then(res => {
          this.showMessage('success', 'Edit!', 'Sửa thành công')
          this.search()
          this.resetForm()
        });
      }
    },

    deleteProduct(id) {

      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:8051/swagger-resources/products/delete/" + id).then(res => {
            this.search()
            this.$swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
          });
        }
      })
    },

    showMessage(icon, title, text) {
      this.$swal.fire({
        showConfirmButton: false,
        timer: 2000,
        icon: icon,
        title: title,
        text: text
      });
      ;
    },
    selectPage1() {
      this.page = 0
      this.search()
      this.isShowPageDown = false
      this.isShowPageUp = true
    },

    selectPageCuoi() {
      this.page = this.totalPage - 1
      this.search()
      this.isShowPageUp = false
      this.isShowPageDown = true
    },

    pageUp() {
      this.page++
      this.search()
      this.isShowPageDown = true
      if (this.page === this.totalPage - 1) {
        this.isShowPageUp = false
        this.isShowPageDown = true
      }
    },
    pageDown() {
      this.page--
      this.search()
      if (this.page === 0) {
        this.isShowPageDown = false
        this.isShowPageUp = true
      }
    },
    showViewpage() {
      if (this.totalPage === 1) {
        this.isShowPageUp = false
        this.isShowPageDown = false
      }
    },
  }
}
</script>

<style>

</style>
