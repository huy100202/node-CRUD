<div class="d-flex flex-row-reverse bd-highlight mb-2">
  <a class="btn btn-outline-info table-link" role="button" href="">
	  <i class="fa fa-eye" aria-hidden="true"></i>
	</a>
	<a class="btn btn-outline-warning" role="button" href="">
		<i class="fas fa-edit"></i>
	</a>
	<a class="btn btn-outline-danger table-link danger delete" role="button" href="" >
		<i class="fas fa-trash"></i>
	</a>
</div>
<?php
$params = (isset($this->record)) ? array('id' => $this->record['categorie_id']) : '';
?>
<form method="post" enctype="multipart/form-data" action="<?php echo html_helpers::url(
    array('ctl' => 'categories',
        'act' => $this->action,
        'params' => $params,
    )); ?>">
  <div class="row mb-3">
    <label for="name" class="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-10">
      <input name="data[<?php echo $this->controller; ?>][name]" type="text" class="form-control" id="name" placeholder="name" <?php echo (isset($this->record)) ? "value='" . $this->record['name'] . "'" : ""; ?>>
    </div>
  </div>
  <div class="row mb-3">
    <label for="description" class="col-sm-2 col-form-label">Description</label>
    <div class="col-sm-10">
      <textarea cols='40' rows='5' name="data[<?php echo $this->controller; ?>][description]" type="text" class="form-control" id="description" placeholder="description" <?php echo (isset($this->record)) ? "value='" . $this->record['description'] . "'" : ""; ?>></textarea>
    </div>
  </div>
  <div class="row mb-3">
    <label for="cost" class="col-sm-2 col-form-label">Cost</label>
    <div class="col-sm-10">
      <input name="data[<?php echo $this->controller; ?>][cost]" type="text" class="form-control" id="cost" placeholder="cost" <?php echo (isset($this->record)) ? "value='" . $this->record['cost'] . "'" : ""; ?>>
    </div>
  </div>
  <div class="row mb-3">
    <label for="class" class="col-sm-2 col-form-label">Path</label>
    <div class="col-sm-10">
      <input name="data[<?php echo $this->controller; ?>][path]" type="text" class="form-control" id="path" placeholder="path" <?php echo (isset($this->record)) ? "value='" . $this->record['path'] . "'" : ""; ?>>
    </div>
  </div>
  <div class="row mb-3">
    <label for="photo" class="col-sm-2 col-form-label">Photo</label>
    <div class="col-sm-10 image-upload">
      <input name="image" type="file" class="form-control" id="photo" placeholder="photo">
	  <?php if (isset($this->record)): ?>
		<img src="<?php echo "media/upload/" . $this->controller . '/' . $this->record['photo']; ?>" alt="<?php echo $this->record['name']; ?>" class="img-thumbnail">
	  <?php endif;?>
    </div>
  </div>
  <div class="row mb-3">
    <div class="offset-sm-2 col-sm-10">
      <button name="btn_submit" type="submit" class="btn btn-primary"><?php echo ucwords($this->action); ?></button>
    </div>
  </div>
</form>

<?php global $mediaFiles;?>
<?php array_push($mediaFiles['js'], RootREL . "media/js/jquery.min.js");?>
<?php array_push($mediaFiles['js'], RootREL . "media/js/form.js");?>
