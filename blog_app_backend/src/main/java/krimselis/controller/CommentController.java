package krimselis.controller;

import krimselis.dto.CommentDto;
import krimselis.dto.PostDto;
import krimselis.service.CommentService;
import krimselis.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;

    @Autowired
    public CommentController(CommentService commentService, PostService postService) {
        this.commentService = commentService;
        this.postService = postService;
    }

    @PostMapping("/{postUrl}/create")
    public ResponseEntity<Object> createComment(@PathVariable("postUrl") String postUrl,
                                                @Valid @RequestBody CommentDto commentDto,
                                                BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(result.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        PostDto postDto = postService.findPostByUrl(postUrl);
        if (postDto == null) {
            return new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND);
        }

        commentService.createComment(postUrl, commentDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{postUrl}/{commentId}")
    public ResponseEntity<Object> deleteComment(@PathVariable("postUrl") String postUrl,
                                                @PathVariable("commentId") Long commentId) {
        PostDto postDto = postService.findPostByUrl(postUrl);
        if (postDto == null) {
            return new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND);
        }

        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

